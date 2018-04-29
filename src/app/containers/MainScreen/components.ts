import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  padding-top: 100px;
  flex-direction: column;
`;
