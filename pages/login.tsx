import React, { useEffect } from "react";
import { OTPMethods, Products, StytchEventType } from "@stytch/vanilla-js";
import { useStytchUser, StytchLogin } from "@stytch/nextjs";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, useMediaQuery } from "@mui/material";
import MobileHeader from "../components/mobile/MobileHeader";
import ContactStytch from "../components/ContactStytch";

const LoginComponent = () => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const width = isMobile ? "340px" : "400px";

  return (
    <>
    <Box mt={2} textAlign="center" sx={{
        backgroundColor: "#D3CEFB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        borderRadius: 2,
        width: width,
        marginY: 2,
    }}>
        Welcome to Stytch&apos;s Passkey Demo App!<br />
        Verify your email or phone for added security, then enjoy swift and secure logins with your Passkey.
    </Box>
      <StytchLogin
        config={{
          products: [Products.otp, Products.passkeys],
          otpOptions: {
            expirationMinutes: 10,
            methods: [OTPMethods.Email, OTPMethods.SMS],
          },
        }}
        styles={{ container: { width: width } }}
        callbacks={{
          onEvent: ({ type, data }) => {
            if (type === StytchEventType.PasskeyAuthenticate) {
              // eslint-disable-next-line no-console
              console.log("Passkey authenticated", data);
              router.push("/dashboard");
            }
            if (type === StytchEventType.OTPsAuthenticate) {
              // eslint-disable-next-line no-console
              console.log("OTP authenticated", data);
              router.push("/dashboard");
            }
          },
        }}
      />
    </>
  );
};

function LoginPage() {
  const { user } = useStytchUser();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.replace("/dashboard");
    }
  });

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <>
      <Head>
        <title>Survey Amp | Login</title>
      </Head>
      <Box width="100%" height="100vh" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          minWidth={isMobile ? undefined : 475}
        >
          {isMobile ? (
            <MobileHeader />
          ) : (
            <>
              <Box mt={2} ml={2} display="flex" gap={2}>
                <Image
                  src="/logo.png"
                  alt="Vector art"
                  width="149"
                  height="34"
                />
              </Box>
            </>
          )}
          <Box
            height="90%"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginX: 2,
            }}
          >
            <LoginComponent />
          </Box>
          <Box m={2}>
            <ContactStytch />
          </Box>
        </Box>
        {!isMobile && (
          <Box
            width="60%"
            sx={{
              backgroundColor: "#D4CEFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/login_img.png"
              alt="Vector art"
              width={500}
              height={500}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default LoginPage;
