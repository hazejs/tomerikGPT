import React from "react";
import { User, Bot } from "lucide-react";
import { Message } from "../types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

interface ChatMessageProps {
  message: Message;
}

// Define the props interfaces without external dependencies
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`py-8 ${isUser ? "bg-white" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto flex gap-6 px-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? "bg-gray-800" : "bg-emerald-500"
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-medium text-sm text-gray-800">
            {isUser ? "You" : "Assistant"}
          </p>
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Code blocks with syntax highlighting
                pre: (props: ComponentProps) => (
                  <pre
                    className="bg-gray-900 rounded-md p-4 overflow-x-auto my-4"
                    {...props}
                  />
                ),
                code: (props: ComponentProps) => {
                  const { className, children, inline } = props;
                  if (inline) {
                    return (
                      <code
                        className="bg-gray-100 px-1 py-0.5 rounded text-gray-800"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Lists with proper styling
                ul: (props: ComponentProps) => (
                  <ul className="list-disc pl-6 space-y-2 my-4" {...props} />
                ),
                ol: (props: ComponentProps) => (
                  <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />
                ),
                li: (props: ComponentProps) => (
                  <li className="mb-1" {...props} />
                ),
                // Headings with proper styling
                h1: (props: ComponentProps) => (
                  <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
                ),
                h2: (props: ComponentProps) => (
                  <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
                ),
                h3: (props: ComponentProps) => (
                  <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
                ),
                // Blockquotes
                blockquote: (props: ComponentProps) => (
                  <blockquote
                    className="border-l-4 border-gray-300 pl-4 italic my-4"
                    {...props}
                  />
                ),
                // Tables
                table: (props: ComponentProps) => (
                  <div className="overflow-x-auto my-4">
                    <table
                      className="min-w-full divide-y divide-gray-300"
                      {...props}
                    />
                  </div>
                ),
                thead: (props: ComponentProps) => (
                  <thead className="bg-gray-50" {...props} />
                ),
                tbody: (props: ComponentProps) => (
                  <tbody className="divide-y divide-gray-200" {...props} />
                ),
                tr: (props: ComponentProps) => (
                  <tr className="hover:bg-gray-50" {...props} />
                ),
                th: (props: ComponentProps) => (
                  <th
                    className="px-3 py-2 text-left text-sm font-semibold text-gray-900"
                    {...props}
                  />
                ),
                td: (props: ComponentProps) => (
                  <td className="px-3 py-2 text-sm text-gray-500" {...props} />
                ),
                // Links
                a: (props: ComponentProps) => (
                  <a className="text-blue-600 hover:underline" {...props} />
                ),
                // Images
                img: (props: ComponentProps) => (
                  <img
                    className="max-w-full h-auto rounded-md my-4"
                    {...props}
                  />
                ),
                // Horizontal rule
                hr: (props: ComponentProps) => (
                  <hr className="my-6 border-t border-gray-300" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
