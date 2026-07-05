import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const actionTypes = ['scored', 'routed', 'stepped', 'won', 'lost', 'learned'] as const;

type ActionType = (typeof actionTypes)[number];

const actionTemplates: Record<ActionType, { message: string; icon: string }> = {
  scored: { message: 'Lead scored {n} points', icon: 'zap' },
  routed: { message: 'Lead routed to {channel}', icon: 'arrow-right' },
  stepped: { message: 'Advanced to stage {stage}', icon: 'trending-up' },
  won: { message: 'Deal closed — ${amount}K', icon: 'trophy' },
  lost: { message: 'Deal lost — {reason}', icon: 'x-circle' },
  learned: { message: 'Model updated from {n} interactions', icon: 'brain' },
};

const channels = ['email', 'sms', 'linkedin', 'phone', 'ads'];
const stages = ['Discovery', 'Qualified', 'Proposal', 'Negotiation'];
const reasons = ['budget', 'timeline', 'competitor', 'no response'];

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildAction(): { id: string; type: ActionType; message: string; timestamp: number; icon: string } {
  const type = randomFrom(actionTypes);
  const template = actionTemplates[type];
  let message = template.message;
  switch (type) {
    case 'scored':
      message = message.replace('{n}', String(randomInt(5, 40)));
      break;
    case 'routed':
      message = message.replace('{channel}', randomFrom(channels));
      break;
    case 'stepped':
      message = message.replace('{stage}', randomFrom(stages));
      break;
    case 'won':
      message = message.replace('{amount}', String(randomInt(5, 120)));
      break;
    case 'lost':
      message = message.replace('{reason}', randomFrom(reasons));
      break;
    case 'learned':
      message = message.replace('{n}', String(randomInt(10, 200)));
      break;
  }
  return {
    id: crypto.randomUUID(),
    type,
    message,
    timestamp: Date.now() - randomInt(0, 5000),
    icon: template.icon,
  };
}

export async function POST() {
  const actionCount = randomInt(5, 8);
  const actions = Array.from({ length: actionCount }, buildAction);

  return NextResponse.json({
    ok: true,
    tick_id: crypto.randomUUID(),
    scored: randomInt(10, 20),
    routed: randomInt(6, 14),
    stepped: randomInt(4, 12),
    won: randomInt(1, 5),
    lost: randomInt(1, 4),
    actions,
    timestamp: Date.now(),
  });
}
