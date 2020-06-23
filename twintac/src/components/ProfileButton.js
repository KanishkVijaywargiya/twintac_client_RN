import React from "react";
import styled from "styled-components";
import { ProfileIcon } from "./Icons.js";

const ProfileButton = () => (
    <Container>
        <ProfileIcon />
    </Container>
);
export default ProfileButton;

const Container = styled.View`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;