"use client";

import React, { useEffect, useRef } from "react";

type NetworkTelemetryProps = {
  className?: string;
};

type TelemetryNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

type PacketPulse = {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: string;
};

const NODE_COLORS = ["74, 222, 128", "103, 232, 249", "245, 176, 65"];
const PACKET_COLORS = ["#67e8f9", "#f5b041", "#ff4d7d"];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function connectionDistance(width: number): number {
  return width < 640 ? 118 : 158;
}

function createNodes(width: number, height: number): TelemetryNode[] {
  const densityCount = Math.round((width * height) / 36000);
  const nodeCount = Math.max(22, Math.min(width < 640 ? 34 : 68, densityCount));

  return Array.from({ length: nodeCount }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.006, 0.006),
    vy: randomBetween(-0.004, 0.004),
    radius: index % 11 === 0 ? 2.2 : randomBetween(1.1, 1.7),
    color: NODE_COLORS[index % NODE_COLORS.length]
  }));
}

function findNearbyNode(nodes: TelemetryNode[], from: number, maxDistance: number): number {
  const candidates: number[] = [];
  const origin = nodes[from];

  for (let index = 0; index < nodes.length; index++) {
    if (index === from) continue;
    const node = nodes[index];
    const distance = Math.hypot(node.x - origin.x, node.y - origin.y);
    if (distance <= maxDistance) candidates.push(index);
  }

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  return (from + 1 + Math.floor(Math.random() * Math.max(1, nodes.length - 1))) % nodes.length;
}

function createPackets(nodes: TelemetryNode[], width: number): PacketPulse[] {
  const count = width < 640 ? 4 : 9;
  const maxDistance = connectionDistance(width) * 1.15;

  return Array.from({ length: count }, (_, index) => {
    const from = Math.floor(Math.random() * nodes.length);
    return {
      from,
      to: findNearbyNode(nodes, from, maxDistance),
      progress: Math.random(),
      speed: randomBetween(0.00007, 0.00013),
      color: PACKET_COLORS[index % PACKET_COLORS.length]
    };
  });
}

export function NetworkTelemetry({ className = "" }: NetworkTelemetryProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const canvasElement: HTMLCanvasElement = canvas;
    const drawingContext: CanvasRenderingContext2D = ctx;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes: TelemetryNode[] = [];
    let packets: PacketPulse[] = [];
    let raf = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    function drawGrid() {
      drawingContext.fillStyle = "rgba(74, 222, 128, 0.055)";
      const spacing = width < 640 ? 56 : 72;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          drawingContext.fillRect(x, y, 1, 1);
        }
      }
    }

    function moveNodes(elapsed: number) {
      for (const node of nodes) {
        node.x += node.vx * elapsed;
        node.y += node.vy * elapsed;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }
    }

    function drawConnections() {
      const maxDistance = connectionDistance(width);
      drawingContext.lineWidth = 0.75;

      for (let first = 0; first < nodes.length; first++) {
        for (let second = first + 1; second < nodes.length; second++) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(b.x - a.x, b.y - a.y);
          if (distance > maxDistance) continue;

          const alpha = (1 - distance / maxDistance) * 0.22;
          drawingContext.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
          drawingContext.beginPath();
          drawingContext.moveTo(a.x, a.y);
          drawingContext.lineTo(b.x, b.y);
          drawingContext.stroke();
        }
      }
    }

    function resetPacket(packet: PacketPulse) {
      packet.from = packet.to;
      packet.to = findNearbyNode(nodes, packet.from, connectionDistance(width) * 1.15);
      packet.progress = 0;
      packet.speed = randomBetween(0.00007, 0.00013);
    }

    function drawPackets(elapsed: number) {
      for (const packet of packets) {
        packet.progress += packet.speed * elapsed;
        if (packet.progress >= 1) resetPacket(packet);

        const from = nodes[packet.from];
        const to = nodes[packet.to];
        const x = from.x + (to.x - from.x) * packet.progress;
        const y = from.y + (to.y - from.y) * packet.progress;
        const trailProgress = Math.max(0, packet.progress - 0.1);
        const trailX = from.x + (to.x - from.x) * trailProgress;
        const trailY = from.y + (to.y - from.y) * trailProgress;

        drawingContext.strokeStyle = `${packet.color}80`;
        drawingContext.lineWidth = 1.25;
        drawingContext.beginPath();
        drawingContext.moveTo(trailX, trailY);
        drawingContext.lineTo(x, y);
        drawingContext.stroke();

        drawingContext.fillStyle = packet.color;
        drawingContext.beginPath();
        drawingContext.arc(x, y, 1.8, 0, Math.PI * 2);
        drawingContext.fill();
      }
    }

    function drawNodes() {
      for (const node of nodes) {
        drawingContext.fillStyle = `rgba(${node.color}, 0.08)`;
        drawingContext.beginPath();
        drawingContext.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
        drawingContext.fill();

        drawingContext.fillStyle = `rgba(${node.color}, 0.58)`;
        drawingContext.beginPath();
        drawingContext.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        drawingContext.fill();
      }
    }

    function renderFrame(elapsed = 0, animate = true) {
      drawingContext.clearRect(0, 0, width, height);
      drawGrid();
      if (animate) moveNodes(elapsed);
      drawConnections();
      if (animate) drawPackets(elapsed);
      drawNodes();
    }

    function draw(now: number) {
      if (document.hidden || reducedMotion) {
        raf = 0;
        return;
      }

      const elapsed = lastFrame ? Math.min(now - lastFrame, 80) : frameInterval;
      if (now - lastFrame < frameInterval) {
        raf = requestAnimationFrame(draw);
        return;
      }

      lastFrame = now;
      renderFrame(elapsed);
      raf = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(raf);
      raf = 0;
      lastFrame = 0;

      if (reducedMotion) {
        renderFrame(0, false);
      } else if (!document.hidden) {
        raf = requestAnimationFrame(draw);
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = width < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvasElement.width = Math.floor(width * dpr);
      canvasElement.height = Math.floor(height * dpr);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(width, height);
      packets = createPackets(nodes, width);
      start();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        start();
      }
    }

    function handleMotionChange(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      start();
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-background-effect="network"
      className={`pointer-events-none fixed inset-0 h-full w-full -z-10 opacity-[0.82] ${className}`}
    />
  );
}
