import styled from 'styled-components';

export const StepButtonsWrapper = styled.div`
  width: 280px;
  height: 37px;
  display: flex;
  flex-direction: row;
  padding: 0 0 20px 20px;
  justify-content: space-between;
  box-sizing: content-box;
  align-items: flex-start;
`;

export const StepContentContainer = styled.div`
  position: relative;
  width: 430px;
  height: auto;
  padding: 60px 0 60px 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start;
  overflow: visible;
`;

export const SuccessMessage = styled.p`
  padding: 10px 0 20px;
  font-size: 16px;
`;
