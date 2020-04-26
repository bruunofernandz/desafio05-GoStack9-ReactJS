import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    height: 40px;
    width: 40px;
  }

  ${() => css`
    svg {
      animation: ${rotate} 1s linear infinite;
    }
  `}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 80px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.header`
  padding-top: 30px;
  margin-top: 10px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 5px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  button {
    height: 20px;
    width: 100px;
    margin: 0 10px;
    border: 0;
    color: #eee;
    background-color: #7159c1;
    border-radius: 4px;
  }

  button:nth-child(${(props) => props.active + 1}) {
    background: #576574;
    color: white;
  }
`;

export const PageAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  button {
    margin: 0 20px;
    border: 0;
    background: #7159c1;
    color: #eee;
    padding: 10px;
  }

  button:disabled {
    background: transparent;
    color: #999;
  }
`;
