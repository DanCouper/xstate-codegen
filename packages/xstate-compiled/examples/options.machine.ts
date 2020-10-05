import { Machine, interpret } from '@xstate/compiled';
import { useMachine } from '@xstate/compiled/react';

interface Context {}

type Event = { type: 'MAKE_FETCH' };

/**
 * Ensures that optional parameters register as non-required
 * when passed in as a second param
 */
const machine = Machine<Context, Event, 'optionsMachine'>(
  {
    initial: 'idle',
    states: {
      idle: {
        entry: ['requiredAction', 'nonRequiredAction'],
        invoke: [
          {
            src: 'requiredService',
            onDone: [
              {
                cond: 'requiredCond',
              },
              {
                cond: 'nonRequiredCond',
              },
            ],
          },
          {
            src: 'nonRequiredService',
          },
        ],
        activities: ['requiredActivity', 'nonRequiredActivity'],
      },
    },
  },
  {
    actions: {
      nonRequiredAction: () => {},
    },
    services: {
      nonRequiredService: async () => {},
    },
    activities: {
      nonRequiredActivity: () => {},
    },
    guards: {
      nonRequiredCond: () => false,
    },
  },
);

const useOptions = () =>
  useMachine(machine, {
    actions: {
      requiredAction: () => {},
    },
    services: {
      requiredService: async () => {},
    },
    activities: {
      requiredActivity: () => {},
    },
    guards: {
      requiredCond: () => true,
    },
  });
