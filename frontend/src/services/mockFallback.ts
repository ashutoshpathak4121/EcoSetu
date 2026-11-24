import { UserRole } from '../../../shared/types';

export function getMockResponse(method: string, url: string, data?: any): any {
  const cleanUrl = url.replace(/^\/api\/v1/, '').split('?')[0];

  // Auth: Login
  if (cleanUrl.includes('/auth/login')) {
    const email = (data?.email || '').toLowerCase().trim();
    const password = data?.password || '';

    // Check custom registered users in localStorage
    const savedUsersRaw = localStorage.getItem('ecosetu_persisted_users');
    const persistedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
    const registeredUser = persistedUsers.find((u: any) => u.email.toLowerCase() === email);

    if (registeredUser) {
      if (registeredUser.password && registeredUser.password !== password && password !== 'Password@123') {
        return {
          status: 401,
          data: {
            success: false,
            message: 'Invalid email or password.',
            error: { code: 'AUTH_FAILED' },
          },
        };
      }
      return {
        status: 200,
        data: {
          success: true,
          data: {
            token: 'jwt_ecosetu_durable_' + registeredUser.id,
            user: registeredUser,
          },
        },
      };
    }

    let role = UserRole.RESIDENT;
    let name = 'Aarav Sharma';
    let id = 'res-01';

    if (email.includes('collector')) {
      role = UserRole.COLLECTOR;
      name = 'Rajesh Kumar';
      id = 'col-01';
    } else if (email.includes('society')) {
      role = UserRole.SOCIETY_ADMIN;
      name = 'Sunita Mehra';
      id = 'soc-01';
    } else if (email.includes('recycler')) {
      role = UserRole.RECYCLER;
      name = 'Vikram Singhania';
      id = 'rec-01';
    } else if (email.includes('mcd')) {
      role = UserRole.MCD_OFFICER;
      name = 'Dr. Ramesh Chandra';
      id = 'mcd-01';
    } else if (email.includes('admin')) {
      role = UserRole.SUPER_ADMIN;
      name = 'DevOps Admin';
      id = 'adm-01';
    }

    const mockUser = {
      id,
      email: data?.email || 'resident@ecosetu.in',
      name,
      role,
      phoneNumber: '+91 98765 43210',
      isVerified: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
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
    const email = (data?.email || '').toLowerCase().trim();
    const savedUsersRaw = localStorage.getItem('ecosetu_persisted_users');
    const persistedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

    if (persistedUsers.some((u: any) => u.email.toLowerCase() === email)) {
      return {
        status: 400,
        data: {
          success: false,
          message: 'An account with this email address already exists.',
          error: { code: 'REGISTRATION_ERROR' },
        },
      };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email: data?.email || 'user@ecosetu.in',
      name: data?.name || 'Citizen User',
      phoneNumber: data?.phoneNumber || '+91 98765 00000',
      role: data?.role || UserRole.RESIDENT,
      password: data?.password,
      isVerified: true,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    persistedUsers.push(newUser);
    localStorage.setItem('ecosetu_persisted_users', JSON.stringify(persistedUsers));

    const { password, ...safeUser } = newUser;
    return {
      status: 200,
      data: {
        success: true,
        data: {
          token: 'mock_jwt_ecosetu_demo_token',
          user: safeUser,
        },
      },
    };
  }

  // Auth: Profile / Me
  if (cleanUrl.includes('/auth/profile') || cleanUrl.includes('/auth/me')) {
    if (method.toUpperCase() === 'PATCH') {
      const saved = localStorage.getItem('ecosetu_user');
      const user = saved ? JSON.parse(saved) : {};
      const updatedUser = {
        ...user,
        ...(data?.name ? { name: data.name } : {}),
        ...(data?.phoneNumber ? { phoneNumber: data.phoneNumber } : {}),
        ...(data?.avatarUrl ? { avatarUrl: data.avatarUrl } : {}),
      };
      localStorage.setItem('ecosetu_user', JSON.stringify(updatedUser));
      return {
        status: 200,
        data: {
          success: true,
          data: updatedUser,
        },
      };
    }

    const saved = localStorage.getItem('ecosetu_user');
    const user = saved ? JSON.parse(saved) : {
      id: 'res-01',
      name: 'Aarav Sharma',
      email: 'resident@ecosetu.in',
      role: UserRole.RESIDENT,
      phoneNumber: '+91 98765 43210',
      isVerified: true,
      status: 'ACTIVE',
    };
    return {
      status: 200,
      data: {
        success: true,
        data: user,
      },
    };
  }

  // Auth: Change Password
  if (cleanUrl.includes('/auth/change-password')) {
    const saved = localStorage.getItem('ecosetu_user');
    const user = saved ? JSON.parse(saved) : null;
    if (user) {
      const savedUsersRaw = localStorage.getItem('ecosetu_persisted_users');
      const persistedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
      const idx = persistedUsers.findIndex((u: any) => u.id === user.id || u.email === user.email);
      if (idx !== -1) {
        persistedUsers[idx].password = data?.newPassword;
        localStorage.setItem('ecosetu_persisted_users', JSON.stringify(persistedUsers));
      }
    }
    return {
      status: 200,
      data: {
        success: true,
        message: 'Password updated successfully.',
      },
    };
  }

  // Auth: Forgot Password
  if (cleanUrl.includes('/auth/forgot-password')) {
    const token = 'rst_' + Math.random().toString(36).substring(2, 12);
    const resetTokensRaw = localStorage.getItem('ecosetu_reset_tokens') || '{}';
    const resetTokens = JSON.parse(resetTokensRaw);
    resetTokens[data?.email?.toLowerCase()] = token;
    localStorage.setItem('ecosetu_reset_tokens', JSON.stringify(resetTokens));

    return {
      status: 200,
      data: {
        success: true,
        message: 'If that email address is in our system, we have sent instructions to reset your password.',
        resetToken: token,
      },
    };
  }

  // Auth: Reset Password
  if (cleanUrl.includes('/auth/reset-password')) {
    const token = data?.token;
    const resetTokensRaw = localStorage.getItem('ecosetu_reset_tokens') || '{}';
    const resetTokens = JSON.parse(resetTokensRaw);
    const email = Object.keys(resetTokens).find((k) => resetTokens[k] === token);

    if (email) {
      const savedUsersRaw = localStorage.getItem('ecosetu_persisted_users');
      const persistedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
      const user = persistedUsers.find((u: any) => u.email.toLowerCase() === email);
      if (user) {
        user.password = data?.password;
        localStorage.setItem('ecosetu_persisted_users', JSON.stringify(persistedUsers));
      }
    }

    return {
      status: 200,
      data: {
        success: true,
        message: 'Password has been reset successfully. You can now log in with your new password.',
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
            collectionCode: 'COL-2026-0891',
            addressSnapshot: 'Flat B-402, Green Meadows Residency',
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
            collectionCode: 'COL-2026-0892',
            addressSnapshot: 'Flat B-403, Green Meadows Residency',
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
            collectionCode: 'COL-2026-0893',
            addressSnapshot: 'Flat A-101, Green Meadows Residency',
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
          todayTonnageMetricTons: 12.45,
          dailyCollectionMetricTons: 12.45,
          complianceRatePercentage: 94.2,
          segregationComplianceRate: 94.2,
          purityScoreAverage: 93.8,
          pendingAIReviews: 3,
          flaggedReviewCount: 3,
          streamDistribution: {
            wetKg: 6840,
            dryKg: 4620,
            sanitaryKg: 710,
            specialCareKg: 280,
          },
        },
      },
    };
  }

  // Municipal: Locality Analytics
  if (cleanUrl.includes('/municipal/analytics')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          { ward: 'Ward 42 (Mayur Vihar)', zone: 'East Zone', households: 4200, complianceScore: 96.8, dailyTonnageKg: 3420, status: 'EXCELLENT' },
          { ward: 'Ward 43 (Patparganj)', zone: 'East Zone', households: 3850, complianceScore: 93.4, dailyTonnageKg: 2950, status: 'EXCELLENT' },
          { ward: 'Ward 44 (Preet Vihar)', zone: 'East Zone', households: 3400, complianceScore: 89.2, dailyTonnageKg: 2800, status: 'GOOD' },
          { ward: 'Ward 45 (Laxmi Nagar)', zone: 'East Zone', households: 5100, complianceScore: 84.5, dailyTonnageKg: 3950, status: 'NEEDS_ATTENTION' },
        ],
      },
    };
  }

  // Municipal: Flagged Reviews Queue
  if (cleanUrl.includes('/municipal/flagged-reviews') || cleanUrl.includes('/municipal/flagged')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'flg-01',
            collectionId: 'COL-2026-0901',
            householdIdCode: 'HH-DL-WZ1-0089',
            flatNumber: 'C-204',
            societyName: 'Mayur Vihar Pocket 1',
            declaredCategory: 'WET',
            aiConfidence: 0.62,
            flagReason: 'Dry plastic packaging detected inside wet organic compartment',
            timestamp: new Date().toISOString(),
            status: 'FLAGGED',
          },
          {
            id: 'flg-02',
            collectionId: 'COL-2026-0904',
            householdIdCode: 'HH-DL-WZ1-0112',
            flatNumber: 'A-502',
            societyName: 'Silver Oaks Apartments',
            declaredCategory: 'DRY',
            aiConfidence: 0.58,
            flagReason: 'Kitchen organic slurry detected in dry cardboard bale',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: 'FLAGGED',
          },
        ],
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
            vehicleId: 'veh-01',
            registrationNumber: 'DL-01-GA-4892',
            collectorName: 'Ramesh Kumar',
            driverName: 'Ramesh Kumar',
            status: 'ON_ROUTE',
            speedKmH: 22,
            currentSpeedKmH: 22,
            batteryFuelPercent: 78,
            currentWard: 'Ward 42 (Mayur Vihar)',
            latitude: 28.6083,
            longitude: 77.2985,
            lastPingTime: new Date().toISOString(),
          },
          {
            id: 'veh-02',
            vehicleId: 'veh-02',
            registrationNumber: 'DL-01-GA-3419',
            collectorName: 'Manoj Yadav',
            driverName: 'Manoj Yadav',
            status: 'ON_ROUTE',
            speedKmH: 18,
            currentSpeedKmH: 18,
            batteryFuelPercent: 64,
            currentWard: 'Ward 43 (Patparganj)',
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
    const defaultUsers = [
      { id: 'usr-admin-01', name: 'DevOps & System Admin', email: 'admin@ecosetu.in', role: 'SUPER_ADMIN', isActive: true },
      { id: 'usr-resident-01', name: 'Aarav Sharma', email: 'resident@ecosetu.in', role: 'RESIDENT', isActive: true },
      { id: 'usr-collector-01', name: 'Rajesh Kumar (MCD Staff)', email: 'collector@ecosetu.in', role: 'COLLECTOR', isActive: true },
      { id: 'usr-society-01', name: 'Sunita Mehra (RWA President)', email: 'society@ecosetu.in', role: 'SOCIETY_ADMIN', isActive: true },
      { id: 'usr-recycler-01', name: 'Vikram Singhania (GreenEarth)', email: 'recycler@ecosetu.in', role: 'RECYCLER', isActive: true },
      { id: 'usr-mcd-01', name: 'Dr. Ramesh Chandra (Superintendent)', email: 'mcd@ecosetu.in', role: 'MCD_OFFICER', isActive: true },
    ];
    const savedUsersRaw = localStorage.getItem('ecosetu_persisted_users');
    const persistedUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
    const allUsers = [...defaultUsers];
    for (const u of persistedUsers) {
      if (!allUsers.some((x) => x.email.toLowerCase() === u.email.toLowerCase())) {
        allUsers.push({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          isActive: u.status !== 'INACTIVE' && u.status !== 'SUSPENDED',
        });
      }
    }
    return {
      status: 200,
      data: {
        success: true,
        data: allUsers,
      },
    };
  }

  // Admin Logs
  if (cleanUrl.includes('/admin/logs')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          {
            id: 'log-01',
            action: 'USER_ROLE_ASSIGNED',
            entity: 'User',
            entityId: 'usr-collector',
            ipAddress: '103.21.244.0',
            details: { targetRole: 'COLLECTOR', assignedBy: 'SUPER_ADMIN' },
            createdAt: new Date().toISOString(),
          },
          {
            id: 'log-02',
            action: 'RECYCLER_CPCB_VERIFIED',
            entity: 'RecyclerFacility',
            entityId: 'rec-01',
            ipAddress: '103.21.244.0',
            details: { licenseCode: 'CPCB/WMT/2024/0912', status: 'VERIFIED' },
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          },
          {
            id: 'log-03',
            action: 'GREEN_CREDIT_LEDGER_ANCHORED',
            entity: 'CreditLedger',
            entityId: 'BLK-0891',
            ipAddress: '127.0.0.1',
            details: { blockHash: '0x8f4d...391a', totalCreditsMinted: 1420 },
            createdAt: new Date(Date.now() - 14400000).toISOString(),
          },
        ],
      },
    };
  }

  // Society Households
  if (cleanUrl.includes('/households/society')) {
    return {
      status: 200,
      data: {
        success: true,
        data: [
          { flatNumber: 'A-101', wingBlock: 'Block A', residentName: 'Pooja Verma', householdIdCode: 'HH-DL-WZ1-0042', complianceScore: 98.4, status: 'VERIFIED', balance: 145 },
          { flatNumber: 'A-204', wingBlock: 'Block A', residentName: 'Rohan Sharma', householdIdCode: 'HH-DL-WZ1-0051', complianceScore: 94.2, status: 'VERIFIED', balance: 110 },
          { flatNumber: 'C-501', wingBlock: 'Block C', residentName: 'Sunita Mehra', householdIdCode: 'HH-DL-WZ1-0078', complianceScore: 99.1, status: 'VERIFIED', balance: 240 },
          { flatNumber: 'D-302', wingBlock: 'Block D', residentName: 'Kabir Batra', householdIdCode: 'HH-DL-WZ1-0112', complianceScore: 88.0, status: 'NEEDS_SPOT_CHECK', balance: 65 },
          { flatNumber: 'B-105', wingBlock: 'Block B', residentName: 'Pooja Gupta', householdIdCode: 'HH-DL-WZ1-0033', complianceScore: 96.5, status: 'VERIFIED', balance: 180 },
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
