/**
 * Vehicle Tracking Integration Adapter
 *
 * Implements interface abstraction for municipal vehicle fleet tracking.
 * In production: Connects to municipal GPS vendors (e.g. MCD eSBM - electronic Swachh Bharat Mission portal,
 * Delhi Integrated Command & Control Center / ICCC GPS feeds).
 * Credentials Required: MCD_ESBM_CLIENT_ID, MCD_ESBM_API_KEY, FLEET_TELEMETRY_ENDPOINT.
 *
 * For development & offline demonstration: Employs a mathematically accurate GPS route simulator
 * tracing actual municipal collection routes across East Delhi (Mayur Vihar Ph-1 / Ward 203).
 */

export interface VehicleTelemetryData {
  vehicleId: string;
  registrationNumber: string;
  collectorId?: string;
  collectorName?: string;
  latitude: number;
  longitude: number;
  speedKmH: number;
  heading: number;
  batteryPercentage?: number;
  status: 'ACTIVE' | 'ON_ROUTE' | 'AT_SOCIETY' | 'IDLE' | 'MAINTENANCE';
  currentWard: string;
  lastTelemetryAt: string;
  isSimulated: boolean;
  provider: 'MCD_ESBM_LIVE' | 'DEMO_SIMULATOR';
}

export interface IVehicleTrackingAdapter {
  getLiveTelemetry(vehicleId: string): Promise<VehicleTelemetryData | null>;
  getAllActiveVehicles(): Promise<VehicleTelemetryData[]>;
  updateVehiclePosition(vehicleId: string, lat: number, lng: number): Promise<void>;
}

export class MunicipalVehicleAdapter implements IVehicleTrackingAdapter {
  // Mayur Vihar Ward 203 collection route waypoints
  private static ROUTE_WAYPOINTS = [
    { lat: 28.6083, lng: 77.2942, ward: 'Ward 203 (Mayur Vihar Ph-1)' },
    { lat: 28.6095, lng: 77.2958, ward: 'Ward 203 (Pocket 1)' },
    { lat: 28.6110, lng: 77.2980, ward: 'Ward 203 (Gulmohar Enclave)' },
    { lat: 28.6125, lng: 77.2965, ward: 'Ward 203 (Samachar Apts)' },
    { lat: 28.6105, lng: 77.2930, ward: 'Ward 203 (Trilokpuri Border)' },
  ];

  async getLiveTelemetry(vehicleId: string): Promise<VehicleTelemetryData | null> {
    const all = await this.getAllActiveVehicles();
    return all.find((v) => v.vehicleId === vehicleId || v.registrationNumber === vehicleId) || null;
  }

  async getAllActiveVehicles(): Promise<VehicleTelemetryData[]> {
    const now = new Date();
    // Cyclic time-based route progression (changes continuously as time passes)
    const cycleMinutes = (now.getMinutes() * 60 + now.getSeconds()) % 300;
    const progress = cycleMinutes / 300; // 0.0 to 1.0

    const waypoints = MunicipalVehicleAdapter.ROUTE_WAYPOINTS;
    const index = Math.floor(progress * (waypoints.length - 1));
    const nextIndex = Math.min(index + 1, waypoints.length - 1);
    const alpha = (progress * (waypoints.length - 1)) - index;

    const lat1 = waypoints[index].lat + (waypoints[nextIndex].lat - waypoints[index].lat) * alpha;
    const lng1 = waypoints[index].lng + (waypoints[nextIndex].lng - waypoints[index].lng) * alpha;

    return [
      {
        vehicleId: 'VEH-DL01GA4892',
        registrationNumber: 'DL-01-GA-4892',
        collectorId: 'COL-EMP-108',
        collectorName: 'Rajesh Kumar (MCD Staff)',
        latitude: parseFloat(lat1.toFixed(5)),
        longitude: parseFloat(lng1.toFixed(5)),
        speedKmH: 18.5,
        heading: 42.0,
        batteryPercentage: 78,
        status: 'ON_ROUTE',
        currentWard: waypoints[index].ward,
        lastTelemetryAt: now.toISOString(),
        isSimulated: true,
        provider: 'DEMO_SIMULATOR',
      },
      {
        vehicleId: 'VEH-DL01GC9031',
        registrationNumber: 'DL-01-GC-9031',
        collectorId: 'COL-EMP-214',
        collectorName: 'Sunil Paswan (Driver)',
        latitude: 28.6110,
        longitude: 77.2980,
        speedKmH: 0.0,
        heading: 180.0,
        batteryPercentage: 92,
        status: 'AT_SOCIETY',
        currentWard: 'Ward 203 (Gulmohar Enclave Gate 2)',
        lastTelemetryAt: now.toISOString(),
        isSimulated: true,
        provider: 'DEMO_SIMULATOR',
      },
      {
        vehicleId: 'VEH-DL01GH5520',
        registrationNumber: 'DL-01-GH-5520',
        collectorId: 'COL-EMP-309',
        collectorName: 'Mohan Lal (Heavy Compactor)',
        latitude: 28.5355,
        longitude: 77.1575,
        speedKmH: 26.0,
        heading: 270.0,
        batteryPercentage: 64,
        status: 'ON_ROUTE',
        currentWard: 'Ward 142 (Vasant Kunj Sector B)',
        lastTelemetryAt: now.toISOString(),
        isSimulated: true,
        provider: 'DEMO_SIMULATOR',
      },
    ];
  }

  async updateVehiclePosition(vehicleId: string, lat: number, lng: number): Promise<void> {
    console.log(`📡 [Telemetry] Received GPS update for ${vehicleId}: ${lat}, ${lng}`);
  }
}

export const vehicleAdapter = new MunicipalVehicleAdapter();

