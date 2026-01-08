export interface SQSJob {
  id: string
  type: 'Run Fetch' | 'Run Rank' | 'Run Partial Rank'
  name: string
  timestamp: string
  status: 'waiting' | 'completed' | 'processing'
}

export interface SQSMockData {
  waitingJobs: SQSJob[]
  completedJobs: SQSJob[]
  currentlyProcessing: SQSJob | null
}

export const mockSQSData: SQSMockData = {
  waitingJobs: [
    {
      id: '1234',
      type: 'Run Fetch',
      name: 'Run Fetch #1234',
      timestamp: '2 mins ago',
      status: 'waiting'
    },
    {
      id: '5678',
      type: 'Run Rank',
      name: 'Run Rank #5678',
      timestamp: '5 mins ago',
      status: 'waiting'
    },
    {
      id: '9101',
      type: 'Run Partial Rank',
      name: 'Run Partial Rank #9101',
      timestamp: '8 mins ago',
      status: 'waiting'
    },
    {
      id: '1121',
      type: 'Run Fetch',
      name: 'Run Fetch #1121',
      timestamp: '12 mins ago',
      status: 'waiting'
    },
    {
      id: '3141',
      type: 'Run Rank',
      name: 'Run Rank #3141',
      timestamp: '15 mins ago',
      status: 'waiting'
    }
  ],
  completedJobs: [
    {
      id: '1122',
      type: 'Run Fetch',
      name: 'Run Fetch #1122',
      timestamp: '1 min ago',
      status: 'completed'
    },
    {
      id: '5679',
      type: 'Run Partial Rank',
      name: 'Run Partial Rank #5679',
      timestamp: '3 mins ago',
      status: 'completed'
    },
    {
      id: '9102',
      type: 'Run Rank',
      name: 'Run Rank #9102',
      timestamp: '7 mins ago',
      status: 'completed'
    },
    {
      id: '1123',
      type: 'Run Fetch',
      name: 'Run Fetch #1123',
      timestamp: '10 mins ago',
      status: 'completed'
    },
    {
      id: '3142',
      type: 'Run Partial Rank',
      name: 'Run Partial Rank #3142',
      timestamp: '14 mins ago',
      status: 'completed'
    },
    {
      id: '4521',
      type: 'Run Rank',
      name: 'Run Rank #4521',
      timestamp: '18 mins ago',
      status: 'completed'
    },
    {
      id: '7856',
      type: 'Run Fetch',
      name: 'Run Fetch #7856',
      timestamp: '22 mins ago',
      status: 'completed'
    },
    {
      id: '9632',
      type: 'Run Partial Rank',
      name: 'Run Partial Rank #9632',
      timestamp: '25 mins ago',
      status: 'completed'
    },
    {
      id: '1478',
      type: 'Run Rank',
      name: 'Run Rank #1478',
      timestamp: '28 mins ago',
      status: 'completed'
    },
    {
      id: '2589',
      type: 'Run Fetch',
      name: 'Run Fetch #2589',
      timestamp: '30 mins ago',
      status: 'completed'
    },
    {
      id: '3698',
      type: 'Run Partial Rank',
      name: 'Run Partial Rank #3698',
      timestamp: '33 mins ago',
      status: 'completed'
    },
    {
      id: '4712',
      type: 'Run Rank',
      name: 'Run Rank #4712',
      timestamp: '35 mins ago',
      status: 'completed'
    }
  ],
  currentlyProcessing: {
    id: '2468',
    type: 'Run Partial Rank',
    name: 'Run Partial Rank #2468',
    timestamp: 'now',
    status: 'processing'
  }
}