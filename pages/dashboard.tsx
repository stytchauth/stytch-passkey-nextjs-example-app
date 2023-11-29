import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Snackbar, Alert
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  StytchPasskeyRegistration,
  useStytch,
  useStytchSession,
  useStytchUser,
} from "@stytch/nextjs";
import SideNavBar from "../components/SideNavBar";
import MobileHeader from "../components/mobile/MobileHeader";
import ContactStytch from "../components/ContactStytch";
import {
  AuthenticationFactor,
  Products,
  StytchEventType,
} from "@stytch/core/public";
import ResetUserStateButton from "@/components/mobile/ResetUserStateButton";

const SESSION_DURATION_MINUTES = 60;

enum StepUpType {
  email = "email",
  phone = "phone",
  webauthn = "webauthn",
}

const StepUp = ({ type }: { type: StepUpType }) => {
  const [inputValue, setInputValue] = useState("");
  const [methodID, setMethodID] = useState("");
  const { user } = useStytchUser();
  const [error, setError] = useState("");
  const stytch = useStytch();

  const validateOTPButtonClick = () => {
    stytch.otps.authenticate(inputValue, methodID, {
      session_duration_minutes: SESSION_DURATION_MINUTES,
    }).catch((e) => {
      setError("Error occurred validating OTP: " + e);
    });
  };

  const handleSendOTPButtonClick = () => {
    if (type === StepUpType.phone) {
      stytch.otps.sms
        .send(user?.phone_numbers?.at(0).phone_number, {
          expiration_minutes: 5,
        })
        .then((resp) => {
          setMethodID(resp.method_id);
        })
        .catch((e) => {
          setError("Error occurred sending SMS: " + e);
        });
    } else {
      stytch.otps.email
        .send(user?.emails?.at(0).email, {
          expiration_minutes: 5,
        })
        .then((resp) => {
          setMethodID(resp.method_id);
        })
        .catch((e) => {
          setError("Error occurred sending email: " + e);
        });
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  if (type === StepUpType.webauthn) {
    return (
      <>
        <h3>You need to step up {type} before creating Passkeys!</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            stytch.webauthn.authenticate({
              session_duration_minutes: SESSION_DURATION_MINUTES,
            });
          }}
        >
          Step Up WebAuthn
        </Button>
      </>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <h3>You need to step up {type} before creating Passkeys!</h3>
      <TextField
        label="Enter OTP"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendOTPButtonClick}
      >
        Send OTP to{" "}
        {type === StepUpType.email
          ? user?.emails?.at(0).email
          : user?.phone_numbers?.at(0).phone_number}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={validateOTPButtonClick}
      >
        Validate OTP
      </Button>
      {error}
    </Box>
  );
};

type RegisterComponentProps = {
    setDisplayRegisterPasskey: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplaySuccessToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterComponent = ({ setDisplayRegisterPasskey, setDisplaySuccessToast }: RegisterComponentProps) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  return (
        <StytchPasskeyRegistration
          config={{ products: [Products.passkeys] }}
          styles={{ container: { width: isMobile ? "340px" : "400px" } }}
          callbacks={{
            onEvent: ({ type, data }) => {
              if (
                type === StytchEventType.PasskeyDone ||
                type === StytchEventType.PasskeySkip
              ) {
                // eslint-disable-next-line no-console
                console.log("Passkey dismissed", data);
                setDisplayRegisterPasskey(false);
              }
              if (type === StytchEventType.PasskeyRegister) {
                setDisplaySuccessToast(true);
              }
            },
          }}
        />
  );
};

function Dashboard() {
  const router = useRouter();
  const stytch = useStytch();
  const { user, isInitialized } = useStytchUser();
  const [displayRegisterPasskey, setDisplayRegisterPasskey] = useState(false);
  const [postRegistrationCopy, setPostRegistrationCopy] = useState("");


  const { session } = useStytchSession();
  const sessionHasWebauthnFactor = session?.authentication_factors?.some(
    (factor: AuthenticationFactor) =>
      factor.delivery_method === "webauthn_registration",
  );
  const sessionHasPhoneFactor = session?.authentication_factors?.some(
    (factor: AuthenticationFactor) => factor.delivery_method === "sms",
  );
  const sessionHasEmailFactor = session?.authentication_factors?.some(
    (factor: AuthenticationFactor) => factor.delivery_method === "email",
  );
  const shouldPromptWebauthn =
    ((sessionHasPhoneFactor && !sessionHasWebauthnFactor) ||
      (sessionHasEmailFactor && !sessionHasWebauthnFactor)) &&
    user?.webauthn_registrations?.length > 0;
  const shouldPromptPhone =
    !sessionHasPhoneFactor &&
    sessionHasWebauthnFactor &&
    user?.phone_numbers?.length > 0;
  const shouldPromptEmail =
    !sessionHasEmailFactor &&
    sessionHasWebauthnFactor &&
    user?.emails?.length > 0;

  useEffect(() => {
    if (isInitialized && user === null) {
      router.push("/login");
    }
  }, [user, isInitialized, router]);

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  const logout = () => {
    stytch.session.revoke();
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Survey Amp | Dashboard</title>
      </Head>
      <Box display="flex" width="100%" height="100vh" flexDirection="column">
        {isMobile ? (
          <MobileHeader logout={logout} showResetUserState={true} />
        ) : (
          <Box
            display="flex"
            width="100%"
            minHeight="75px"
            alignItems="center"
            justifyContent="space-between"
            paddingX={3}
            gap={1}
          >
            <Image src="/logo.png" alt="Vector art" width="149" height="34" />
            <ContactStytch />
            <Stack direction="row" display="flex" alignItems="center" gap={2}>
              <Image src="/help.png" alt="Vector art" width="24" height="24" />
              <Image
                src="/notifications.png"
                alt="Vector art"
                width="24"
                height="24"
              />
              <Image
                src="/account.png"
                alt="Vector art"
                width="53"
                height="53"
              />
              <ResetUserStateButton />
            </Stack>
          </Box>
        )}
        <Box display="flex" width="100%" minHeight="90vh">
          {!isMobile && <SideNavBar logout={() => logout()} />}
          <Box
            display="flex"
            width="100%"
            height="fit-content"
            sx={{ backgroundColor: "#EEECFF" }}
            padding={4}
            flexDirection="column"
            alignItems="center"
            gap={2}
            margin="16px"
          >
            <Box
              display="flex"
              width="100%"
              sx={{ backgroundColor: "black" }}
              flexDirection="column"
              alignSelf="start"
              padding={2}
              color="white"
            >
              <Typography variant="h1">Welcome!</Typography>
              <Typography variant="caption">
                You are now logged into SurveyAmp
              </Typography>
            </Box>
            {displayRegisterPasskey ? (
                <>
                  {shouldPromptWebauthn && <StepUp type={StepUpType.webauthn} />}
                  {shouldPromptPhone && <StepUp type={StepUpType.phone} />}
                  {shouldPromptEmail && <StepUp type={StepUpType.email} />}
                  {!shouldPromptEmail &&
                      !shouldPromptPhone &&
                      !shouldPromptWebauthn && (
                          <RegisterComponent setDisplayRegisterPasskey={setDisplayRegisterPasskey} setDisplaySuccessToast={setOpen}/>
                      )}
                </>
            ) : (
                <>
                  <Typography variant="caption">
                    You have {user?.webauthn_registrations?.length} registered Passkey(s)
                  </Typography>
                  <Button onClick={() => setDisplayRegisterPasskey(true)}>
                    Create a Passkey
                  </Button>
                </>
            )}
            <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }} open={open} autoHideDuration={20000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '87.5%' }}>
                Congratulations on successfully creating a Passkey! To see Passkey authentication in action, just sign out and log back in. Also, if your Passkey is synced, explore cross-device authentication by visiting this website on your mobile device and logging in!</Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
