import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {Helmet} from "react-helmet";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Bonjour ! Je suis votre compagnon personnel. Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me parler de votre journée, vos pensées ou tout ce qui vous préoccupe. 🌿",
    timestamp: new Date(),
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input.trim()),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Helmet>
        <title>Chat IA - Votre compagnon bienveillant</title>
        <meta name="description" content="Discutez avec votre compagnon IA personnalisé" />
      </Helmet>
      <AppLayout>
        <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] flex flex-col">
          {/* Header */}
          <header className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Chat IA</h1>
                <p className="text-sm text-muted-foreground">Votre compagnon bienveillant</p>
              </div>
            </div>
          </header>
          {/* Messages */}
          <Card variant="glass" className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-slide-up",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    message.role === "assistant" ? "bg-primary" : "bg-secondary"
                  )}>
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl",
                    message.role === "assistant" 
                      ? "bg-secondary/50 rounded-tl-md" 
                      : "bg-primary text-primary-foreground rounded-tr-md"
                  )}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 animate-slide-up">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-2xl rounded-tl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez votre message..."
                  className="flex-1 resize-none bg-secondary/50 border-0 rounded-xl p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[48px] max-h-32"
                  rows={1}
                />
                <Button 
                  variant="sage" 
                  size="icon-lg"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </AppLayout>
    </>
  );
};

function getAIResponse(input: string): string {
  const responses = [
    "Je comprends ce que vous ressentez. Prendre le temps de réfléchir à ses pensées est une excellente habitude. Y a-t-il quelque chose de spécifique dont vous aimeriez parler ?",
    "C'est formidable que vous preniez le temps de vous exprimer. Continuez à cultiver cette bienveillance envers vous-même. 🌱",
    "Merci de partager cela avec moi. N'oubliez pas que chaque petit pas compte dans votre parcours de bien-être.",
    "Je suis là pour vous écouter. Qu'est-ce qui vous aiderait à vous sentir mieux en ce moment ?",
  ];
  return responses[Math.floor(Math.random() * responses.length)];


}

export default Chat;
