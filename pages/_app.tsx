import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import { StytchProvider } from "@stytch/nextjs";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { StytchClientOptions } from "@stytch/vanilla-js";
import { theme } from "@/utils/theme";

const stytchClientOptions = {
  cookieOptions: {
    jwtCookieName: `stytch_session_passkey_demo_jwt`,
    opaqueTokenCookieName: `stytch_session_passkey_demo`,
  },
} as StytchClientOptions;

function MyApp({ Component, pageProps }: AppProps) {
  const stytch = createStytchUIClient(
    process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string,
    stytchClientOptions,
  );

  return (
    <>
      <StytchProvider stytch={stytch}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <Box
            position="absolute"
            bottom={0}
            right={0}
            margin={2}
            width="90%"
            maxWidth="800px"
          ></Box>
        </ThemeProvider>
      </StytchProvider>
    </>
  );
}

export default MyApp;
