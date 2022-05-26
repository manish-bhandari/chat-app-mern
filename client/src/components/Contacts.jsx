import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(0);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <h3>Chat App</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contacts;

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 75% 15%;
  overflow: hidden;
  background-color: #1d2325;
  border-radius: 15px 0 0 15px;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      color: white;
      font-size: clamp(18px, 2vw, 25px);
      font-weight: 300;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #72787b;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #373939;
      min-height: 5rem;
      @media (max-width: 600px) {
        min-height: 2rem;
      }
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.2s ease;
      border-bottom: 1px solid #72787b;
      @media (max-width: 600px) {
        gap: 0.5rem;
      }
      .avatar {
        img {
          height: 3rem;
          @media (max-width: 600px) {
            height: 2rem;
          }
        }
      }
      .username {
        h3 {
          font-weight: 300;
          letter-spacing: 1px;
          color: white;
          @media (max-width: 600px) {
            font-size: 12px;
          }
        }
      }
    }
    .selected {
      background-color: #459fdf;
    }
  }
  .current-user {
    background-color: #3d494d;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    @media (max-width: 800px) {
      gap: 0;
    }
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        @media (max-width: 600px) {
          height: 3rem;
        }
      }
    }
    .username {
      h2 {
        color: white;
        @media (max-width: 800px) {
          display: none;
        }
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
