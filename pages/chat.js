import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNDI4NywiZXhwIjoxOTU4ODgwMjg3fQ.Z4aRGlTSkWUSFQNGBPg-ycshMJcgFPWvrwICVpRpNIw';
const SUPABASE_URL = 'https://nrosyolymrdzsvxkvrub.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);
    
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setMessageList(data);
            });
    }, [])

    function handleNewMessage(newMessage) {
        const message = {
            from: 'paola-yumi-m',
            text: newMessage,
            isDeleted: false
        } 

        supabaseClient
            .from('mensagens')
            .insert([message])
            .then(({ data }) => {
                setMessageList([
                    data[0],
                    ...messageList
                ]);
            })

        setMessage('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.personalized.beige,
                backgroundImage: `url(https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.personalized['blue-dark']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.personalized['pink-light'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.personalized['purple-light'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messages={messageList} setMessage={setMessageList}/>
                    {/* {messageList.map((message) => {
                        return (
                            <li key={message.id}>
                                {message.from}: {message.text}
                            </li>
                        );
                    })} */}
                    

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                const value = event.target.value;
                                setMessage(value);
                            }}  
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.personalized.beige,
                                marginRight: '12px',
                                color: appConfig.theme.colors.personalized['blue-dark'],
                            }}
                        />

                        <Button
                            variant='secondary'
                            colorVariant='neutral'
                            label='Send'
                            size='sm'
                            onClick={() => {
                                handleNewMessage(message);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ 
                width: '100%', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                }} >
                <Text variant='heading5' styleSheet={{fontFamily: 'Century Gothic'}}>
                    Chat
                </Text>
                <Button
                    styleSheet={{fontFamily: 'Century Gothic'}}
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    function deleteMessage(messageList) {
        const filtered = messageList.filter((message) => {
            return message.isDeleted === false;
        })
        props.setMessage(filtered);
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.personalized['blue-dark'],
                marginBottom: '16px',
                paddingRight: '5px'
            }}
        >
            {props.messages.map((message) => {
                return(
                    <Text
                    key={message.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.personalized['beige'],
                        },
                        fontFamily: 'Century Gothic'
                    }}
                    >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px'
                            }}
                            src={`https://github.com/${message.from}.png`}
                        />
                        <Text 
                            tag="strong"
                            styleSheet={{
                                fontFamily: 'Century Gothic',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}
                        >
                            {message.from}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                        <Button
                            iconName="times"
                            variant='tertiary'
                            colorVariant='neutral'
                            size='xs'
                            styleSheet={{
                                alignItems: 'flex-end',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.personalized['beige'],
                                    color: appConfig.theme.colors.personalized['blue-dark']
                                }
                            }}
                            onClick={() => {
                                message.isDeleted = true;
                                deleteMessage(props.messages);
                            }}
                        />
                    </Box>
                    {message.text}
                    </Text>     
                );
                
            })}
        </Box>
    )
}