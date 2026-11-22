import { PrismaClient, Role, WasteStreamType, CollectionStatus, VerificationStatus, PurityGrade, ListingStatus, OrderStatus, CreditTransactionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting EcoSetu database seeding...');

  // 1. Password hashing
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Password@123', salt);

  // 2. Clear existing records in proper referential order
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.order.deleteMany();
  await prisma.purchaseRequest.deleteMany();
  await prisma.wasteListing.deleteMany();
  await prisma.rewardRedemption.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.creditAccount.deleteMany();
  await prisma.aIVerificationRecord.deleteMany();
  await prisma.mediaUpload.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.collectionTask.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.collector.deleteMany();
  await prisma.household.deleteMany();
  await prisma.society.deleteMany();
  await prisma.locality.deleteMany();
  await prisma.recyclerProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.wasteCategory.deleteMany();

  // 3. Create Waste Categories
  const categories = await Promise.all([
    prisma.wasteCategory.create({
      data: {
        code: 'WET',
        name: 'Wet Waste (Organic)',
        description: 'Vegetable/fruit peels, leftover food, tea leaves, garden leaves, eggshells.',
        recommendedHandling: 'Dispose in green bin or green compartment of divided bag. Keep dry from excess liquids.',
        colorCode: '#2d6a4f',
      },
    }),
    prisma.wasteCategory.create({
      data: {
        code: 'DRY',
        name: 'Dry Waste (Recyclable)',
        description: 'Paper, cardboard, plastics (PET/HDPE), milk pouches, metal cans, glass bottles.',
        recommendedHandling: 'Rinse and dry before disposal in blue compartment. Ensure no wet contamination.',
        colorCode: '#2563eb',
      },
    }),
    prisma.wasteCategory.create({
      data: {
        code: 'SANITARY',
        name: 'Sanitary Waste',
        description: 'Sanitary pads, diapers, bandages, medical swabs, expired prescription pills.',
        recommendedHandling: 'Wrap securely in newspaper/paper bag, mark with prominent RED dot, place in sanitary add-on pouch.',
        colorCode: '#dc2626',
      },
    }),
    prisma.wasteCategory.create({
      data: {
        code: 'SPECIAL_CARE',
        name: 'Special-Care / Domestic Hazardous',
        description: 'Batteries, CFL/tubelights, electronic cables, broken thermometers, paint cans, pesticides.',
        recommendedHandling: 'Store in safe yellow container. Do not break fluorescent glass. Hand directly to designated collector.',
        colorCode: '#ca8a04',
      },
    }),
  ]);

  // 4. Create Localities (Municipal Wards)
  const locEast = await prisma.locality.create({
    data: {
      code: 'LOC-DL-WZ1-04',
      name: 'Mayur Vihar Phase 1',
      ward: 'Ward 203',
      zone: 'East Zone',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110091',
    },
  });

  const locSouth = await prisma.locality.create({
    data: {
      code: 'LOC-DL-SZ2-09',
      name: 'Vasant Kunj Sector B',
      ward: 'Ward 142',
      zone: 'South Zone',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110070',
    },
  });

  // 5. Create Societies
  const societyGulmohar = await prisma.society.create({
    data: {
      code: 'SOC-GULM-01',
      name: 'Gulmohar Enclave RWA',
      localityId: locEast.id,
      address: 'Plot 42, Mayur Vihar Phase 1 Extn, Delhi',
      totalFlats: 160,
      registrationNo: 'RWA/EAST/2018/892',
    },
  });

  const societyAravali = await prisma.society.create({
    data: {
      code: 'SOC-ARAV-02',
      name: 'Aravali Heights Cooperative Housing',
      localityId: locSouth.id,
      address: 'Sector B, Pocket 7, Vasant Kunj, Delhi',
      totalFlats: 220,
      registrationNo: 'RWA/SOUTH/2015/341',
    },
  });

  // 6. Create Users
  // 6.1 Resident User
  const residentUser = await prisma.user.create({
    data: {
      email: 'resident@ecosetu.in',
      passwordHash,
      name: 'Aarav Sharma',
      phoneNumber: '+919876543210',
      role: Role.RESIDENT,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  // 6.2 Waste Collector User
  const collectorUser = await prisma.user.create({
    data: {
      email: 'collector@ecosetu.in',
      passwordHash,
      name: 'Rajesh Kumar (MCD Staff)',
      phoneNumber: '+919811223344',
      role: Role.COLLECTOR,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  });

  // 6.3 Society Admin User
  const societyUser = await prisma.user.create({
    data: {
      email: 'society@ecosetu.in',
      passwordHash,
      name: 'Sunita Mehra (President RWA)',
      phoneNumber: '+919822334455',
      role: Role.SOCIETY_ADMIN,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
  });

  // 6.4 Recycler User
  const recyclerUser = await prisma.user.create({
    data: {
      email: 'recycler@ecosetu.in',
      passwordHash,
      name: 'Vikram Singhania (GreenEarth Recyclers)',
      phoneNumber: '+919833445566',
      role: Role.RECYCLER,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  });

  // 6.5 MCD Municipal Officer
  const mcdUser = await prisma.user.create({
    data: {
      email: 'mcd@ecosetu.in',
      passwordHash,
      name: 'Dr. Ramesh Chandra (Sanitation Superintendent)',
      phoneNumber: '+919844556677',
      role: Role.MCD_OFFICER,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
  });

  // 6.6 Super Admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@ecosetu.in',
      passwordHash,
      name: 'DevOps & System Admin (Team MazeRunners)',
      phoneNumber: '+919899001122',
      role: Role.SUPER_ADMIN,
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    },
  });

  // 7. Create Collector profile
  const collector = await prisma.collector.create({
    data: {
      employeeId: 'COL-EMP-108',
      userId: collectorUser.id,
      assignedLocalityId: locEast.id,
      phone: '+919811223344',
      shift: 'MORNING',
      activeStatus: true,
    },
  });

  // 8. Create Vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      vehicleNumber: 'DL-01-GA-4892',
      vehicleType: 'ELECTRIC_TIPPER',
      collectorId: collector.id,
      localityId: locEast.id,
      capacityKg: 1200.0,
      status: 'ON_ROUTE',
      currentLatitude: 28.6083,
      currentLongitude: 77.2942,
      heading: 45.0,
      speedKmH: 18.5,
      lastTelemetryAt: new Date(),
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      vehicleNumber: 'DL-01-GC-9031',
      vehicleType: 'HYDRAULIC_COMPACTOR',
      localityId: locEast.id,
      capacityKg: 3500.0,
      status: 'ACTIVE',
      currentLatitude: 28.6110,
      currentLongitude: 77.2980,
      heading: 180.0,
      speedKmH: 24.0,
      lastTelemetryAt: new Date(),
    },
  });

  // 9. Create Household Profile for Resident
  const household = await prisma.household.create({
    data: {
      householdId: 'HH-DL-WZ1-0042',
      userId: residentUser.id,
      societyId: societyGulmohar.id,
      localityId: locEast.id,
      flatNumber: 'B-402',
      wingBlock: 'Block B',
      qrCodeHash: 'QR-HASH-SWACHH-WZ1-0042-SECRET',
      complianceScore: 98.4,
    },
  });

  // 10. Create Credit Account for Household
  const creditAccount = await prisma.creditAccount.create({
    data: {
      householdId: household.id,
      balance: 145,
      totalEarned: 220,
      totalRedeemed: 75,
      tier: 'ECO_CHAMPION',
    },
  });

  // 11. Create Credit Transactions Ledger
  await prisma.creditTransaction.createMany({
    data: [
      {
        accountId: creditAccount.id,
        amount: 20,
        transactionType: CreditTransactionType.EARN_SEGREGATION,
        idempotencyKey: 'TXN-INIT-20261101-001',
        description: 'Daily collection: Perfect 4-stream segregation verified by AI.',
        balanceAfter: 20,
      },
      {
        accountId: creditAccount.id,
        amount: 10,
        transactionType: CreditTransactionType.BONUS_PURITY,
        idempotencyKey: 'TXN-INIT-20261101-002',
        description: 'Zero-contamination weekly consistency bonus.',
        balanceAfter: 30,
      },
      {
        accountId: creditAccount.id,
        amount: 15,
        transactionType: CreditTransactionType.EARN_SEGREGATION,
        idempotencyKey: 'TXN-INIT-20261105-001',
        description: 'Daily collection: Verified segregated dry and wet streams.',
        balanceAfter: 45,
      },
      {
        accountId: creditAccount.id,
        amount: -50,
        transactionType: CreditTransactionType.REDEEM_REWARD,
        idempotencyKey: 'TXN-REDEEM-20261110-001',
        description: 'Redeemed: 5kg Organic Compost Pack from MCD Nursery.',
        balanceAfter: 95,
      },
      {
        accountId: creditAccount.id,
        amount: 50,
        transactionType: CreditTransactionType.EARN_SEGREGATION,
        idempotencyKey: 'TXN-INIT-20261120-001',
        description: 'Daily collection: Clean segregation with sanitary add-on pouch.',
        balanceAfter: 145,
      },
    ],
  });

  // 12. Create Rewards Catalogue
  const rewardCompost = await prisma.reward.create({
    data: {
      title: '5kg Enriched Urban Compost Bag',
      description: '100% organic, lab-tested compost produced directly from society wet waste bio-digesters.',
      category: 'COMPOST',
      creditCost: 50,
      partnerName: 'MCD Horticulture Wing',
      stockQuantity: 85,
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300',
      terms: 'Redeemable at society gate or nearest municipal nursery.',
    },
  });

  const rewardLiners = await prisma.reward.create({
    data: {
      title: 'Biodegradable Divided Bin Liners (Roll of 30)',
      description: 'Cornstarch-based compostable bags custom-sized for EcoSetu dual compartments.',
      category: 'LINERS',
      creditCost: 40,
      partnerName: 'WasteChakra Eco Essentials',
      stockQuantity: 120,
      imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300',
      terms: 'Delivered during scheduled doorstep collection run.',
    },
  });

  const rewardTaxRebate = await prisma.reward.create({
    data: {
      title: 'MCD Property Tax 5% Green Rebate Coupon',
      description: 'Official municipal credit voucher deductible from annual residential property tax.',
      category: 'TAX_REBATE',
      creditCost: 200,
      partnerName: 'Municipal Corporation of Delhi',
      stockQuantity: 500,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300',
      terms: 'Applicable for financial year 2026-27 assessments.',
    },
  });

  const rewardMetro = await prisma.reward.create({
    data: {
      title: 'Delhi Metro Smart Card ₹100 Eco Top-Up',
      description: 'Instant contactless wallet recharge for Delhi Metro Rail Corporation network.',
      category: 'VOUCHERS',
      creditCost: 100,
      partnerName: 'DMRC Green Mobility Initiative',
      stockQuantity: 250,
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300',
      terms: 'Redemption PIN delivered via SMS within 2 minutes.',
    },
  });

  // 13. Create Collections with AI Verification
  const collection1 = await prisma.collection.create({
    data: {
      collectionCode: 'COL-20261120-0042',
      householdId: household.id,
      collectorId: collector.id,
      societyId: societyGulmohar.id,
      localityId: locEast.id,
      status: CollectionStatus.VERIFIED,
      totalWeightKg: 3.4,
      wetWeightKg: 2.1,
      dryWeightKg: 1.1,
      sanitaryWeightKg: 0.2,
      specialCareWeightKg: 0.0,
      latitude: 28.6083,
      longitude: 77.2942,
      accuracyMeters: 4.5,
      addressSnapshot: 'Flat B-402, Gulmohar Enclave, Mayur Vihar Phase 1',
      notes: 'Excellent segregation. Divided bag wet and dry compartments used correctly.',
      collectedAt: new Date(Date.now() - 2 * 86400000),
    },
  });

  await prisma.aIVerificationRecord.create({
    data: {
      collectionId: collection1.id,
      predictedCategory: WasteStreamType.DRY,
      confidence: 0.94,
      contaminationIndex: 0.03,
      verificationStatus: VerificationStatus.APPROVED,
      modelVersion: 'ecosetu-waste-v2.1',
      detectedItems: ['cardboard_packaging', 'crushed_pet_bottles', 'aluminum_cans'],
      reviewedByUserId: collectorUser.id,
      reviewerNote: 'Visual AI confidence 94% confirmed. Zero organic residue in dry compartment.',
      verifiedAt: new Date(Date.now() - 2 * 86400000),
    },
  });

  // Collection 2: Today's pending collection for live testing
  const collection2 = await prisma.collection.create({
    data: {
      collectionCode: 'COL-20261122-0042',
      householdId: household.id,
      collectorId: collector.id,
      societyId: societyGulmohar.id,
      localityId: locEast.id,
      status: CollectionStatus.ASSIGNED,
      totalWeightKg: 0.0,
      wetWeightKg: 0.0,
      dryWeightKg: 0.0,
      sanitaryWeightKg: 0.0,
      specialCareWeightKg: 0.0,
      addressSnapshot: 'Flat B-402, Gulmohar Enclave, Mayur Vihar Phase 1',
      notes: 'Morning collection scheduled between 8:30 AM - 10:00 AM.',
    },
  });

  // Collection 3: Requiring Review (for Municipal review demo)
  const collection3 = await prisma.collection.create({
    data: {
      collectionCode: 'COL-20261121-0089',
      householdId: household.id,
      collectorId: collector.id,
      societyId: societyGulmohar.id,
      localityId: locEast.id,
      status: CollectionStatus.VERIFICATION_PENDING,
      totalWeightKg: 4.8,
      wetWeightKg: 3.2,
      dryWeightKg: 1.6,
      sanitaryWeightKg: 0.0,
      specialCareWeightKg: 0.0,
      latitude: 28.6085,
      longitude: 77.2946,
      addressSnapshot: 'Flat B-402, Gulmohar Enclave',
      notes: 'Mixed stream suspicion: plastic wrapper visible in organic bag.',
      collectedAt: new Date(Date.now() - 86400000),
    },
  });

  await prisma.aIVerificationRecord.create({
    data: {
      collectionId: collection3.id,
      predictedCategory: WasteStreamType.WET,
      confidence: 0.68,
      contaminationIndex: 0.18,
      verificationStatus: VerificationStatus.REQUIRES_REVIEW,
      modelVersion: 'ecosetu-waste-v2.1',
      detectedItems: ['vegetable_peels', 'plastic_milk_pouch_wrapper'],
      reviewerNote: 'Flagged for supervisor spot check: plastic contamination in organic waste.',
    },
  });

  // 14. Create Recycler Profile
  const recyclerProfile = await prisma.recyclerProfile.create({
    data: {
      userId: recyclerUser.id,
      companyName: 'GreenEarth Recyclers India Pvt Ltd',
      gstNumber: '07AABCG1234F1Z8',
      cpcbLicenseNumber: 'CPCB/DL/E-WASTE/2024/9021',
      categoriesHandled: ['DRY', 'SPECIAL_CARE'],
      verificationStatus: 'VERIFIED',
      officeAddress: 'B-14, Okhla Industrial Area Phase 2, New Delhi 110020',
      verifiedAt: new Date(Date.now() - 30 * 86400000),
    },
  });

  // 15. Create Waste Marketplace Listings
  const listing1 = await prisma.wasteListing.create({
    data: {
      listingCode: 'LIST-2026-PET-001',
      societyId: societyGulmohar.id,
      category: WasteStreamType.DRY,
      subType: 'Baled PET Bottles (Clean & Flaked)',
      quantityKg: 350.0,
      purityGrade: PurityGrade.A_PLUS,
      minimumBidPerKg: 32.5,
      pickupAddress: 'Gulmohar Enclave Society Baler Station, Gate 2',
      localityName: 'Mayur Vihar Phase 1, Delhi',
      status: ListingStatus.ACTIVE,
      notes: 'Machine compressed 25kg bales. Zero moisture, transparent PET only.',
      images: ['https://images.unsplash.com/photo-1528323273322-d81458248d40?w=500'],
    },
  });

  const listing2 = await prisma.wasteListing.create({
    data: {
      listingCode: 'LIST-2026-CARD-002',
      societyId: societyAravali.id,
      category: WasteStreamType.DRY,
      subType: 'High-Tensile Cardboard & Kraft Paper',
      quantityKg: 620.0,
      purityGrade: PurityGrade.A,
      minimumBidPerKg: 14.0,
      pickupAddress: 'Aravali Heights Service Yard, Sector B, Vasant Kunj',
      localityName: 'Vasant Kunj, Delhi',
      status: ListingStatus.ACTIVE,
      notes: 'Sorted corrugated packaging cardboard, dry stored.',
      images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500'],
    },
  });

  const listing3 = await prisma.wasteListing.create({
    data: {
      listingCode: 'LIST-2026-HDPE-003',
      societyId: societyGulmohar.id,
      category: WasteStreamType.DRY,
      subType: 'Rigid Plastics (HDPE/PP Detergent & Milk Drums)',
      quantityKg: 180.0,
      purityGrade: PurityGrade.A,
      minimumBidPerKg: 28.0,
      pickupAddress: 'Gulmohar Enclave Service Ramp',
      localityName: 'Mayur Vihar Phase 1',
      status: ListingStatus.ACTIVE,
      notes: 'Rinsed, color-sorted plastics.',
      images: ['https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=500'],
    },
  });

  // 16. Create Purchase Request & Completed Order
  const purchaseRequest = await prisma.purchaseRequest.create({
    data: {
      listingId: listing1.id,
      recyclerId: recyclerProfile.id,
      offeredPricePerKg: 34.0,
      requestedQuantityKg: 350.0,
      notes: 'Immediate pickup with authorized electric carrier.',
      status: 'ACCEPTED',
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-11-0089',
      listingId: listing1.id,
      purchaseRequestId: purchaseRequest.id,
      buyerId: recyclerProfile.id,
      sellerSocietyId: societyGulmohar.id,
      agreedPricePerKg: 34.0,
      totalAmount: 11900.0,
      manifestCode: 'DL-MCD-WM-2026-9812-B',
      weighbridgeSlipUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
      status: OrderStatus.WEIGHBRIDGE_VERIFIED,
      paymentStatus: 'ESCROW_HOLD',
    },
  });

  // 17. System Audit Logs
  await prisma.auditLog.createMany({
    data: [
      {
        userId: adminUser.id,
        action: 'SYSTEM_BOOTSTRAP',
        entity: 'SystemConfig',
        entityId: 'SYS-2026',
        details: { version: '1.0.0', event: 'Techathon 2026 Initial deployment' },
      },
      {
        userId: collectorUser.id,
        action: 'COLLECTION_VERIFIED',
        entity: 'Collection',
        entityId: collection1.id,
        details: { code: collection1.collectionCode, weightKg: 3.4, aiConfidence: 0.94 },
      },
    ],
  });

  // 18. Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: residentUser.id,
        title: 'Waste Collection Verified 🎉',
        message: 'Your morning waste collection was verified with 94% segregation score. +20 Green Credits credited!',
        type: 'SUCCESS',
        isRead: false,
      },
      {
        userId: residentUser.id,
        title: 'Collection Scheduled for Today',
        message: 'Collector Rajesh Kumar (DL-01-GA-4892) is on the way to Block B.',
        type: 'INFO',
        isRead: true,
      },
      {
        userId: societyUser.id,
        title: 'New Bid on PET Plastic Listing',
        message: 'GreenEarth Recyclers offered ₹34.00/kg on your 350kg PET listing.',
        type: 'SUCCESS',
        isRead: false,
      },
      {
        userId: mcdUser.id,
        title: 'Contamination Flagged in Ward 203',
        message: 'Collection COL-20261121-0089 requires supervisor adjudication.',
        type: 'WARNING',
        isRead: false,
      },
    ],
  });

  console.log('✅ Seed completed successfully with realistic Indian municipal & household data!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

