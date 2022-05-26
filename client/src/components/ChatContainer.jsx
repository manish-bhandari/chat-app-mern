import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getAllMessages = async () => {
      const { data } = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(data);
    };
    getAllMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        setArrivalMessage({
          from: data.from,
          fromSelf: false,
          message: data.msg,
        });
      });
    }
  }, []);

  const handleSendMsg = async (msg) => {
    const sendMsg = async () => {
      socket.current.emit("send-msg", {
        to: currentChat,
        from: currentUser,
        message: msg,
      });

      axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    };
    sendMsg();
  };

  useEffect(() => {
    if (arrivalMessage) {
      if (arrivalMessage.from.username === currentChat.username) {
        const message = { fromSelf: false, message: arrivalMessage.message };
        setMessages((prev) => [...prev, message]);
      }
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${message.fromSelf ? "sent" : "recieved"}`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 73% 15%;
  gap: 0.1rem;
  overflow: hidden;
  border-radius: 0 15px 0 0;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #7a9cb5;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #98e7a4;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #bedeec;
      }
    }
  }
`;
