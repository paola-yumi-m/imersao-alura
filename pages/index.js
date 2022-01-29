import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json';

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.personalized['blue-dark']};
                font-size: 26px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState(''); 
  const showData = function (username, location) {
    if (username.length > 2) {
      return [username, location];
    } else {
      return ['-', '-'];
    }
  }
  const router = useRouter();
  const [location, setLocation] = React.useState(''); 
  async function getLocation(username) {
    const url = `https://api.github.com/users/${username}` 
    try {
      const response = await fetch(url, {method: 'GET'});
      if (response.ok) {
        const jsonResponse = await response.json();
        setLocation(jsonResponse.location);
      } 
    }
    catch(error) {
      return '-';
    }
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.personalized['beige'],
          backgroundImage: 'url(https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px', //marginRight: '550px', marginBottom: '250px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.personalized['beige'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              router.push(`/chat?username=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Welcome back!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.personalized['blue-light'], fontWeight: '600' }}>
              {appConfig.name}
            </Text>

            <TextField
              placeholder='username'
              value={username}
              onChange={function (event) {
                const value = event.target.value;
                setUsername(value);
                getLocation(value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.personalized.beige,
                  mainColor: appConfig.theme.colors.personalized['pink-light'],
                  mainColorHighlight: appConfig.theme.colors.personalized['blue-dark'],
                  backgroundColor: appConfig.theme.colors.personalized['pink-light'],
                },
              }}
            />
            <Button
              type='submit'
              label='Sign in'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.personalized['beige'],
                mainColor: appConfig.theme.colors.personalized['pink-dark'],
                mainColorLight: appConfig.theme.colors.personalized['pink-light'],
                mainColorStrong: appConfig.theme.colors.personalized['blue-dark'],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              borderRadius: '10px',
              borderColor: appConfig.theme.colors.personalized['pink-light'],
              backgroundColor: appConfig.theme.colors.personalized['beige'],
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                border: '1px solid',
                borderColor: appConfig.theme.colors.personalized['blue-dark']
              }}
              src={`https://github.com/${showData(username, location)[0]}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.personalized.beige,
                backgroundColor: appConfig.theme.colors.personalized['blue-light'],
                textAlign: 'center',
                padding: '3px 30px',
                borderRadius: '1000px'
              }}
            >
              user: {username} <br/> 
              location: {showData(username, location)[1]}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}