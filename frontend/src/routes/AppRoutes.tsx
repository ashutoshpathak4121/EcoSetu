import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';

// Dedicated Portal Layouts
import { AdminLayout } from '../portals/admin/AdminLayout';
import { AdminLoginPage } from '../portals/admin/AdminLoginPage';
import { ResidentLayout } from '../portals/resident/ResidentLayout';
import { ResidentLoginPage } from '../portals/resident/ResidentLoginPage';
import { CollectorLayout } from '../portals/collector/CollectorLayout';
import { CollectorLoginPage } from '../portals/collector/CollectorLoginPage';
import { SocietyLayout } from '../portals/society/SocietyLayout';
import { SocietyLoginPage } from '../portals/society/SocietyLoginPage';
import { MunicipalLayout } from '../portals/municipal/MunicipalLayout';
import { MunicipalLoginPage } from '../portals/municipal/MunicipalLoginPage';
import { RecyclerLayout } from '../portals/recycler/RecyclerLayout';
import { RecyclerLoginPage } from '../portals/recycler/RecyclerLoginPage';

// Public pages
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { HowItWorksPage } from '../pages/HowItWorksPage';
import { SegregationGuidePage } from '../pages/SegregationGuidePage';
import { ImpactPage } from '../pages/ImpactPage';
import { ContactPage } from '../pages/ContactPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

// Resident pages
import { ResidentDashboard } from '../pages/resident/ResidentDashboard';
import { MyHouseholdPage } from '../pages/resident/MyHouseholdPage';
import { WasteSegregationPage } from '../pages/resident/WasteSegregationPage';
import { CollectionRequestsPage } from '../pages/resident/CollectionRequestsPage';
import { CollectionHistoryPage } from '../pages/resident/CollectionHistoryPage';
import { WasteCreditsPage } from '../pages/resident/WasteCreditsPage';
import { RewardsPage } from '../pages/resident/RewardsPage';

// Collector pages
import { CollectorDashboard } from '../pages/collector/CollectorDashboard';
import { CollectorTasksPage } from '../pages/collector/CollectorTasksPage';
import { CollectorMapPage } from '../pages/collector/CollectorMapPage';
import { UploadProofPage } from '../pages/collector/UploadProofPage';

// Society pages
import { SocietyDashboard } from '../pages/society/SocietyDashboard';
import { SocietyHouseholdsPage } from '../pages/society/SocietyHouseholdsPage';
import { SocietyMarketplacePage } from '../pages/society/SocietyMarketplacePage';

// Recycler pages
import { RecyclerDashboard } from '../pages/recycler/RecyclerDashboard';
import { RecyclerMarketplacePage } from '../pages/recycler/RecyclerMarketplacePage';
import { RecyclerOrdersPage } from '../pages/recycler/RecyclerOrdersPage';

// Municipal pages
import { MunicipalDashboard } from '../pages/municipal/MunicipalDashboard';
import { MunicipalFleetPage } from '../pages/municipal/MunicipalFleetPage';
import { MunicipalFlaggedReviewPage } from '../pages/municipal/MunicipalFlaggedReviewPage';

// Super Admin pages
import { SuperAdminDashboard } from '../pages/admin/SuperAdminDashboard';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/segregation-guide" element={<SegregationGuidePage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 2. Dedicated Portal Login Gateways */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/login/resident" element={<ResidentLoginPage />} />
      <Route path="/login/collector" element={<CollectorLoginPage />} />
      <Route path="/login/society" element={<SocietyLoginPage />} />
      <Route path="/login/municipal" element={<MunicipalLoginPage />} />
      <Route path="/login/recycler" element={<RecyclerLoginPage />} />

      {/* 3. Dedicated Portal 1: Super Admin (/admin/*) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="logs" element={<AdminAuditLogsPage />} />
      </Route>

      {/* 4. Dedicated Portal 2: Resident Portal (/resident/*) */}
      <Route path="/resident" element={<ResidentLayout />}>
        <Route index element={<Navigate to="/resident/dashboard" replace />} />
        <Route path="dashboard" element={<ResidentDashboard />} />
        <Route path="household" element={<MyHouseholdPage />} />
        <Route path="ai-verify" element={<WasteSegregationPage />} />
        <Route path="request" element={<CollectionRequestsPage />} />
        <Route path="history" element={<CollectionHistoryPage />} />
        <Route path="credits" element={<WasteCreditsPage />} />
        <Route path="rewards" element={<RewardsPage />} />
      </Route>

      {/* 5. Dedicated Portal 3: Collector Field Portal (/collector/*) */}
      <Route path="/collector" element={<CollectorLayout />}>
        <Route index element={<Navigate to="/collector/dashboard" replace />} />
        <Route path="dashboard" element={<CollectorDashboard />} />
        <Route path="tasks" element={<CollectorTasksPage />} />
        <Route path="map" element={<CollectorMapPage />} />
        <Route path="upload" element={<UploadProofPage />} />
      </Route>

      {/* 6. Dedicated Portal 4: Society RWA Portal (/society/*) */}
      <Route path="/society" element={<SocietyLayout />}>
        <Route index element={<Navigate to="/society/dashboard" replace />} />
        <Route path="dashboard" element={<SocietyDashboard />} />
        <Route path="households" element={<SocietyHouseholdsPage />} />
        <Route path="marketplace" element={<SocietyMarketplacePage />} />
      </Route>

      {/* 7. Dedicated Portal 5: Municipal MCD Command Portal (/municipal/*) */}
      <Route path="/municipal" element={<MunicipalLayout />}>
        <Route index element={<Navigate to="/municipal/dashboard" replace />} />
        <Route path="dashboard" element={<MunicipalDashboard />} />
        <Route path="fleet" element={<MunicipalFleetPage />} />
        <Route path="flagged" element={<MunicipalFlaggedReviewPage />} />
      </Route>

      {/* 8. Dedicated Portal 6: Recycler B2B Exchange Portal (/recycler/*) */}
      <Route path="/recycler" element={<RecyclerLayout />}>
        <Route index element={<Navigate to="/recycler/dashboard" replace />} />
        <Route path="dashboard" element={<RecyclerDashboard />} />
        <Route path="marketplace" element={<RecyclerMarketplacePage />} />
        <Route path="orders" element={<RecyclerOrdersPage />} />
      </Route>

      {/* 9. Backward compatibility aliases for /dashboard/:role */}
      <Route path="/dashboard" element={<Navigate to="/resident/dashboard" replace />} />
      <Route path="/dashboard/resident/*" element={<Navigate to="/resident/dashboard" replace />} />
      <Route path="/dashboard/collector/*" element={<Navigate to="/collector/dashboard" replace />} />
      <Route path="/dashboard/society/*" element={<Navigate to="/society/dashboard" replace />} />
      <Route path="/dashboard/recycler/*" element={<Navigate to="/recycler/dashboard" replace />} />
      <Route path="/dashboard/municipal/*" element={<Navigate to="/municipal/dashboard" replace />} />
      <Route path="/dashboard/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
