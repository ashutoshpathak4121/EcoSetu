import { UserRole } from '../../../shared/types';

export function getMockResponse(method: string, url: string, data?: any): any {
  const cleanUrl = url.replace(/^\/api\/v1/, '').split('?')[0];

  // Auth: Login
  if (cleanUrl.includes('/auth/login')) {
    const email = (data?.email || '').toLowerCase();
    let role = UserRole.RESIDENT;
    let name = 'Aarav Sharma';
    let id = 'res-01';

    if (email.includes('collector')) {
      role = UserRole.COLLECTOR;
      name = 'Ramesh Kumar';
      id = 'col-01';
    } else if (email.includes('society')) {
      role = UserRole.SOCIETY_ADMIN;
      name = 'Sunita Mehra';
      id = 'soc-01';
    } else if (email.includes('recycler')) {
      role = UserRole.RECYCLER;
      name = 'Rajesh Gupta';
      id = 'rec-01';
    } else if (email.includes('mcd')) {
      role = UserRole.MCD_OFFICER;
      name = 'Vikram Singh';
      id = 'mcd-01';
    } else if (email.includes('admin')) {
      role = UserRole.SUPER_ADMIN;
      name = 'Ashutosh Pathak';
      id = 'adm-01';
    }

    const mockUser = {
      id,
      email: data?.email || 'resident@ecosetu.in',
      name,
      role,
      phoneNumber: '+91 98765 43210',
    };

    return {
      status: 200,
      data: {
        success: true,
        data: {
          token: 'mock_jwt_ecosetu_demo_token',
          user: mockUser,
        },
      },
    };
  }

  // Auth: Register
  if (cleanUrl.includes('/auth/register')) {
    const mockUser = {
      id: `usr-${Date.now()}`,
      email: data?.email || 'user@ecosetu.in',
      name: data?.name || 'Citizen User',
      role: data?.role || UserRole.RESIDENT,
    };
    return {
      status: 200,
      data: {
        success: true,
        data: {
          token: 'mock_jwt_ecosetu_demo_token',
          user: mockUser,
        },
      },
    };
  }

  // Auth: Current User Profile
  if (cleanUrl.includes('/auth/me')) {
    const saved = localStorage.getItem('ecosetu_user');
    const user = saved ? JSON.parse(saved) : {
      id: 'res-01',
      name: 'Aarav Sharma',
      email: 'resident@ecosetu.in',
      role: UserRole.RESIDENT,
    };
    return {
      status: 200,
      data: {
        success: true,
        data: user,
      },
    };
  }

  // Household Profile
  if (cleanUrl.includes('/households/me')) {
    return {
      status: 200,
      data: {
        success: true,
        data: {
          id: 'hh-dl-wz1-0042',
          householdIdCode: 'HH-DL-WZ1-0042',
          flatNumber: 'B-402',
          wingBlock: 'Block B',
          society: {
            name: 'Green Meadows Residency',
            locality: { name: 'Mayur Vihar Phase 1' },
          },
          creditAccount: {
            balance: 420,
            tier: 'GREEN_CHAMPION',
            lifetimeCredits: 1250,
          },
          collectionsCount: 28,
          streakDays: 14,
        },
      },
    };
  }

  // AI Verification
  if (cleanUrl.includes('/ai/verify')) {
    return {
      status: 200,
      data: {
        success: true,
        data: {
          verifiedCategory: data?.declaredCategory || 'WET_ORGANIC',
          confidence: 0.942,
          status: 'APPROVED',
          purityScore: 94,
          contaminationDetected: false,
          detectedItems: ['vegetable_peels', 'biodegradable_scraps'],
          notes: 'High compliance. Dual-compartment segregation verified.',
          modelVersion: 'ecosetu-waste-v2.1',
        },
      },
    };
  }

  // Collections List
  if (cleanUrl.includes('/collections')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'col-101',
            collectionCode: 'COL-2026-0891',
            status: 'VERIFIED',
            scheduledDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            wetWeightKg: 2.4,
            dryWeightKg: 1.8,
            sanitaryWeightKg: 0.0,
            specialCareWeightKg: 0.0,
            creditsAwarded: 25,
            purityScore: 96,
            household: {
              householdIdCode: 'HH-DL-WZ1-0042',
              flatNumber: 'B-402',
              user: { name: 'Aarav Sharma' },
            },
          },
          {
            id: 'col-102',
            collectionCode: 'COL-2026-0890',
            status: 'VERIFIED',
            scheduledDate: new Date(Date.now() - 86400000).toISOString(),
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            wetWeightKg: 2.1,
            dryWeightKg: 1.5,
            sanitaryWeightKg: 0.2,
            specialCareWeightKg: 0.0,
            creditsAwarded: 20,
            purityScore: 92,
            household: {
              householdIdCode: 'HH-DL-WZ1-0042',
              flatNumber: 'B-402',
              user: { name: 'Aarav Sharma' },
            },
          },
        ],
      },
    };
  }

  // Green Credits Balance & Stats
  if (cleanUrl.includes('/credits/balance')) {
    return {
      status: 200,
      data: {
        success: true,
        data: {
          balance: 420,
          greenStreak: 14,
          co2SavedKg: 58.4,
          totalKgRecycled: 142.5,
          tier: 'GREEN_CHAMPION',
        },
      },
    };
  }

  // Rewards Catalog
  if (cleanUrl.includes('/credits/rewards')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'rew-1',
            name: '5kg Enriched Organic Bio-Compost',
            description: 'Produced from community wet waste bio-digesters. 100% chemical free.',
            creditCost: 150,
            category: 'GARDENING',
            stock: 45,
          },
          {
            id: 'rew-2',
            name: 'Roll of 30 Cornstarch 4-Stream Liners',
            description: 'Fully compostable divided bin liners compliant with IS/ISO 17088.',
            creditCost: 200,
            category: 'HOUSEHOLD',
            stock: 80,
          },
          {
            id: 'rew-3',
            name: 'MCD Property Tax 5% Rebate Voucher',
            description: 'Official municipal rebate certificate for verified source segregation.',
            creditCost: 500,
            category: 'MUNICIPAL_REBATE',
            stock: 20,
          },
          {
            id: 'rew-4',
            name: 'Dual-Compartment Odorless Kitchen Caddy',
            description: 'Countertop divided container for easy wet and dry separation.',
            creditCost: 350,
            category: 'HOUSEHOLD',
            stock: 30,
          },
        ],
      },
    };
  }

  // Credits Transactions Ledger
  if (cleanUrl.includes('/credits/transactions')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'tx-01',
            type: 'EARN_COLLECTION',
            amount: 25,
            balanceAfter: 420,
            description: 'Verified dual-bag segregation reward (COL-2026-0891)',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'tx-02',
            type: 'EARN_STREAK',
            amount: 50,
            balanceAfter: 395,
            description: '14-Day Consecutive Green Streak Bonus',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
      },
    };
  }

  // Collector: Tasks
  if (cleanUrl.includes('/collector/tasks')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'task-1',
            flatNumber: 'B-402',
            wingBlock: 'Block B',
            householdIdCode: 'HH-DL-WZ1-0042',
            residentName: 'Aarav Sharma',
            status: 'PENDING',
            priority: 'NORMAL',
            hasSpecialCare: false,
          },
          {
            id: 'task-2',
            flatNumber: 'B-403',
            wingBlock: 'Block B',
            householdIdCode: 'HH-DL-WZ1-0043',
            residentName: 'Priya Verma',
            status: 'COLLECTED',
            priority: 'NORMAL',
            hasSpecialCare: true,
          },
          {
            id: 'task-3',
            flatNumber: 'A-101',
            wingBlock: 'Block A',
            householdIdCode: 'HH-DL-WZ1-0012',
            residentName: 'Rohit Joshi',
            status: 'PENDING',
            priority: 'HIGH',
            hasSpecialCare: false,
          },
        ],
      },
    };
  }

  // Marketplace: Listings
  if (cleanUrl.includes('/marketplace/listings')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'lot-01',
            lotTitle: 'Sorted PET Bottles (Baled - High Purity)',
            category: 'DRY_RECYCLABLE',
            subCategory: 'PET_PLASTIC',
            weightKg: 450,
            purityGrade: 'A_PLUS',
            pricePerKg: 34.5,
            status: 'ACTIVE',
            societyName: 'Green Meadows Residency',
            location: 'Mayur Vihar, East Delhi',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'lot-02',
            lotTitle: 'Corrugated Cardboard & Paper Bales',
            category: 'DRY_RECYCLABLE',
            subCategory: 'CARDBOARD',
            weightKg: 820,
            purityGrade: 'GRADE_A',
            pricePerKg: 14.0,
            status: 'ACTIVE',
            societyName: 'Silver Oaks Apartments',
            location: 'Patparganj, East Delhi',
            createdAt: new Date().toISOString(),
          },
        ],
      },
    };
  }

  // Municipal: Overview
  if (cleanUrl.includes('/municipal/overview')) {
    return {
      status: 200,
      data: {
        success: true,
        data: {
          totalHouseholds: 18450,
          totalSocieties: 48,
          activeVehicles: 14,
          dailyCollectionMetricTons: 42.8,
          segregationComplianceRate: 91.4,
          purityScoreAverage: 93.8,
          flaggedReviewCount: 3,
        },
      },
    };
  }

  // Municipal: Fleet
  if (cleanUrl.includes('/municipal/vehicles')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'veh-01',
            registrationNumber: 'DL-01-GA-4892',
            driverName: 'Ramesh Kumar',
            status: 'ON_ROUTE',
            currentSpeedKmH: 22,
            batteryFuelPercent: 78,
            currentWard: 'Ward 42',
            latitude: 28.6083,
            longitude: 77.2985,
            lastPingTime: new Date().toISOString(),
          },
          {
            id: 'veh-02',
            registrationNumber: 'DL-01-GA-3419',
            driverName: 'Manoj Yadav',
            status: 'ON_ROUTE',
            currentSpeedKmH: 18,
            batteryFuelPercent: 64,
            currentWard: 'Ward 42',
            latitude: 28.6142,
            longitude: 77.3041,
            lastPingTime: new Date().toISOString(),
          },
        ],
      },
    };
  }

  // Admin Users
  if (cleanUrl.includes('/admin/users')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          { id: '1', name: 'Ashutosh Pathak', email: 'admin@ecosetu.in', role: 'SUPER_ADMIN' },
          { id: '2', name: 'Aarav Sharma', email: 'resident@ecosetu.in', role: 'RESIDENT' },
          { id: '3', name: 'Ramesh Kumar', email: 'collector@ecosetu.in', role: 'COLLECTOR' },
          { id: '4', name: 'Sunita Mehra', email: 'society@ecosetu.in', role: 'SOCIETY_ADMIN' },
          { id: '5', name: 'Rajesh Gupta', email: 'recycler@ecosetu.in', role: 'RECYCLER' },
          { id: '6', name: 'Vikram Singh', email: 'mcd@ecosetu.in', role: 'MCD_OFFICER' },
        ],
      },
    };
  }

  // Default Success
  return {
    status: 200,
    data: {
      success: true,
      message: 'Action completed successfully (Demo Mode)',
      data: { id: `id-${Date.now()}` },
    },
  };
}
