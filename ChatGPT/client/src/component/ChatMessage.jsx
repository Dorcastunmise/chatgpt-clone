import chatgptIcon from './chatgpt-icon.svg';
import authorImage from './author.png';

function ChatMessage({ message }) {
  const avatarStyle = {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  };

  return (
    <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === 'gpt' && 'chatgpt'}`}>
          {message.user === 'gpt' ? (
            <img src={chatgptIcon} alt="ChatGPT Icon" style={avatarStyle} />
          ) : (
            <img src={authorImage} alt="Author Avatar" style={avatarStyle} />
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
