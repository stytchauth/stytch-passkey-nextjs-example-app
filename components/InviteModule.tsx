import React, { useState } from 'react';
import { Box, Backdrop, Stack, TextField, Typography, Button } from '@mui/material';
import Image from 'next/image';

type Props = {
  onLater: () => void;
  onInvite: (emails: string[]) => void;
};

function InviteModule(props: Props) {
  const { onLater, onInvite } = props;
  const [email, setEmails] = useState({ a: '', b: '', c: '' });
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <Box width="708px" height="492px" sx={{ backgroundColor: '#ffffff' }} display="flex">
        <Box flexGrow={1} p={4}>
          <Typography variant="h1" fontSize={40} fontWeight={600} mb={1}>
            {'Yay! Almost there...'}
          </Typography>
          <Typography>{'Invite your team members to start collecting data together!'}</Typography>
          <Stack gap={2} marginY={4}>
            <TextField
              placeholder="Add email here"
              variant="outlined"
              value={email.a}
              onChange={(e) => setEmails({ ...email, a: e.target.value })}
            />
            <TextField
              placeholder="Add email here"
              variant="outlined"
              value={email.b}
              onChange={(e) => setEmails({ ...email, b: e.target.value })}
            />
            <TextField
              placeholder="Add email here"
              variant="outlined"
              value={email.c}
              onChange={(e) => setEmails({ ...email, c: e.target.value })}
            />
          </Stack>
          <Box display={'flex'} width="100%" flexDirection={'row'} justifyContent="space-between">
            <Button
              sx={{
                '&:hover': {
                  backgroundColor: 'lightgray',
                },
                color: 'black',
                textTransform: 'none',
                padding: '6px 35px',
              }}
              onClick={onLater}
            >
              {"I'll do it later"}
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: '#28231D',
                },
                textTransform: 'none',
                padding: '6px 35px',
              }}
              onClick={() => {
                onInvite(Object.values(email));
              }}
            >
              Invite your team
            </Button>
          </Box>
        </Box>
        <Box
          width="243px"
          sx={{
            backgroundColor: '#f8f7ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          paddingX={4}
        >
          <Image src="/invite.png" alt="Vector art" width={189} height={191} />
        </Box>
      </Box>
    </Backdrop>
  );
}

export default InviteModule;
