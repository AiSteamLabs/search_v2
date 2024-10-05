"use client";

import React, { ReactElement, cloneElement } from 'react';
import { Thread, ThreadConfig, ThreadWelcome, Composer, useThreadConfig } from "@assistant-ui/react";
import { PriceSnapshotTool } from "@/components/tools/price-snapshot/PriceSnapshotTool";
import { PurchaseStockTool } from "@/components/tools/purchase-stock/PurchaseStockTool";
import { ToolFallback } from "@/components/tools/ToolFallback";
import { makeMarkdownText } from "@assistant-ui/react-markdown";

const MarkdownText = makeMarkdownText({});
const MyThreadWelcomeSuggestions: React.FC = () => {
  const { welcome: { suggestions } = {} } = useThreadConfig();
  return (
    <div className="aui-thread-welcome-suggestion-container">
      {suggestions?.map((suggestion, idx) => {
        const key = `${suggestion.prompt}-${idx}`;
        return <ThreadWelcome.Suggestion key={key} suggestion={suggestion} />;
      })}
      {suggestions?.map((suggestion, idx) => {
        const key = `dup-${suggestion.prompt}-${idx}`;
        return <ThreadWelcome.Suggestion key={key} suggestion={suggestion} />;
      })}      
    </div>
  );
};


const MyThreadWelcome: React.FC = () => {
  return (
    <ThreadWelcome.Root>
      <ThreadWelcome.Center>
        <ThreadWelcome.Avatar />
        <ThreadWelcome.Message />
      </ThreadWelcome.Center>
      <div className="aui-thread-welcome-suggestion-wrapper">
          <MyThreadWelcomeSuggestions />
      </div>
    </ThreadWelcome.Root>
  );
};

const MyThread: React.FC<ThreadConfig> = (config) => {
  return (
    <Thread.Root config={config}>
      <Thread.Viewport>
        <MyThreadWelcome />
        <Thread.Messages />
        <Thread.ViewportFooter>
          <Thread.ScrollToBottom />
          <Composer />
        </Thread.ViewportFooter>
      </Thread.Viewport>
    </Thread.Root>
  );
};

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <MyThread
        welcome={{
	  message: "The intelligent communication engine of the Solana ecosystem",
          suggestions: [
            {
              "prompt": "What is Solana?"
            },
            {
              "prompt": "How to create a Solana wallet?"
            },
            {
              "prompt": "How does Solana achieve high transaction speed?"
            },
            {
              "prompt": "How to participate in SOL staking?"
            },
            {
              "prompt": "What should I do if my Solana Network transaction is taking too long to confirm?"
            },
            {
              "prompt": "How do I check the status of my Solana Network transaction?"
            },
          ],
        }}
        assistantMessage={{ components: { Text: MarkdownText } }}
        tools={[PriceSnapshotTool, PurchaseStockTool]}
	assistantAvatar={{
            src: "./AvatarImage.svg",
        //    fallback: "Steam"
          }}
      />
    </div>
  );
}
