"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type { ITerminalOptions } from "@xterm/xterm";

export interface XTermHandle {
  write: (data: string) => void;
  writeln: (data: string) => void;
  clear: () => void;
  focus: () => void;
}

interface XTermProps {
  options?: ITerminalOptions;
  className?: string;
  onData?: (data: string) => void;
}

const DEFAULT_OPTIONS: ITerminalOptions = {
  fontFamily: "Menlo, Monaco, Consolas, monospace",
  fontSize: 13,
  lineHeight: 1.35,
  cursorBlink: true,
  scrollback: 1000,
  convertEol: true,
  theme: {
    background: "#141414",
    foreground: "#c5c9d1",
    cursor: "#c5c9d1",
    selectionBackground: "#5DA5D580",
    black: "#1E1E1D",
    brightBlack: "#262625",
    red: "#E54B4B",
    green: "#9ECE58",
    yellow: "#FAED70",
    blue: "#396FE2",
    magenta: "#BB80B3",
    cyan: "#2DDAFD",
    white: "#d0d0d0",
    brightRed: "#FF5370",
    brightGreen: "#C3E88D",
    brightYellow: "#FFCB6B",
    brightBlue: "#82AAFF",
    brightMagenta: "#C792EA",
    brightCyan: "#89DDFF",
    brightWhite: "#ffffff",
  },
};

const XTerm = forwardRef<XTermHandle, XTermProps>(
  ({ options, className, onData }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const termRef = useRef<import("@xterm/xterm").Terminal | null>(null);
    const fitRef = useRef<import("@xterm/addon-fit").FitAddon | null>(null);

    useImperativeHandle(ref, () => ({
      write: (data) => termRef.current?.write(data),
      writeln: (data) => termRef.current?.writeln(data),
      clear: () => termRef.current?.clear(),
      focus: () => termRef.current?.focus(),
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      let term: import("@xterm/xterm").Terminal;
      let fitAddon: import("@xterm/addon-fit").FitAddon;

      (async () => {
        const { Terminal } = await import("@xterm/xterm");
        const { FitAddon } = await import("@xterm/addon-fit");
        await import("@xterm/xterm/css/xterm.css");

        term = new Terminal({ ...DEFAULT_OPTIONS, ...options });
        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(containerRef.current!);
        fitAddon.fit();

        termRef.current = term;
        fitRef.current = fitAddon;

        if (onData) term.onData(onData);

        const ro = new ResizeObserver(() => fitAddon.fit());
        ro.observe(containerRef.current!);

        return () => ro.disconnect();
      })();

      return () => {
        termRef.current?.dispose();
        termRef.current = null;
        fitRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={containerRef} className={className} />;
  }
);

XTerm.displayName = "XTerm";
export { XTerm };
