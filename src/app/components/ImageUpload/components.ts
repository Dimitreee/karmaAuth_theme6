import styled from 'styled-components';

export const InputWrapper = styled.div`
  border-radius: 10px;
  border: 2px solid #4b4a4a;
  background-color: #8c8a8a;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  text-align: center;
  display: flex;
  flex: 1;
  position: relative;

  svg {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50);
  }

  input {
    display: none;
  }

  &:hover {
    background-color: #a5a3a3;
    border: 2px dotted #7b7979;

    span {
      display: none;
    }

    svg {
      display: block;
    }
  }
`;

export const UploadWrapper = styled.div`
  display: flex;
  flex: 1;
  border: 2px solid #4b4a4a;
  background-color: #8c8a8a;
  border-radius: 10px;
`;

export const LoadTitle = styled.span`
  font-size: 24px;
  margin: auto;
`;
