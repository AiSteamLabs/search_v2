import React from 'react';
import { Thread } from '@assistant-ui/react';
import { AssistantMessage as ASM } from '@assistant-ui/react';


const CustomThread = (props) => {
  const handleCopy = (content) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content)
        .then(() => console.log('Copied to clipboard'))
        .catch(err => {
          console.error('Failed to copy: ', err);
          fallbackCopyTextToClipboard(content);
        });
    } else {
      fallbackCopyTextToClipboard(content);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('Fallback: Copied to clipboard');
    } catch (err) {
      console.error('Fallback: Unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <Thread
      {...props}
      components={{
        ...props.components,
        AssistantMessage: (messageProps) => (
          <div>
            {props.components?.AssistantMessage ? (
              <props.components.AssistantMessage {...messageProps} />
            ) : (
              <ASM {...messageProps} />
            )}
            <button onClick={() => handleCopy(messageProps.content)}>Copy</button>
          </div>
        ),
      }}
    />
  );
};

export default CustomThread;

