import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  padding: 0 3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    /* gap: 2rem; */
    background-color: #2d3543;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      /* padding-left: 1rem; */
      padding: 20px 20px 20px 30px;
      font-size: 1.2rem;
      font-weight: 200;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      @media (max-width: 1080px) {
        font-size: 13px;
      }
    }
    button {
      padding: 0.3rem 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 0.5rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
