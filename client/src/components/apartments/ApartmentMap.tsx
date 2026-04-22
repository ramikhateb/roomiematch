import { useEffect, useMemo } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { Icon } from 'leaflet'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker1x from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import type { Apartment } from '../../types/apartment'

type ApartmentMapProps = {
  apartments: Apartment[]
  selectedApartmentId: string | null
  onSelectApartment: (id: string | null) => void
}

const TLV_CENTER: [number, number] = [32.0853, 34.7818]
const DEFAULT_ZOOM = 11

Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
})

function FitMapBounds({ points }: { points: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (points.length === 0) {
      map.setView(TLV_CENTER, DEFAULT_ZOOM)
      return
    }

    if (points.length === 1) {
      map.setView(points[0], 14)
      return
    }

    map.fitBounds(points, {
      padding: [36, 36],
      maxZoom: 15,
    })
  }, [map, points])

  return null
}

function ApartmentMap({
  apartments,
  selectedApartmentId,
  onSelectApartment,
}: ApartmentMapProps) {
  const mappableApartments = useMemo(
    () =>
      apartments.filter(
        (apartment) =>
          typeof apartment.latitude === 'number' &&
          typeof apartment.longitude === 'number'
      ),
    [apartments]
  )

  const markerPoints = useMemo(
    () =>
      mappableApartments.map(
        (apartment) => [apartment.latitude!, apartment.longitude!] as [number, number]
      ),
    [mappableApartments]
  )

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Map view</h2>
          <p className="mt-1 text-sm text-slate-600">
            Click a pin or a listing card to sync the map and the grid.
          </p>
        </div>
        <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
          {mappableApartments.length} on map
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <MapContainer
          center={TLV_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-[320px] w-full sm:h-[420px]"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitMapBounds points={markerPoints} />

          {mappableApartments.map((apartment) => {
            const isSelected = selectedApartmentId === apartment.id
            return (
              <Marker
                key={apartment.id}
                position={[apartment.latitude!, apartment.longitude!]}
                zIndexOffset={isSelected ? 800 : 0}
                eventHandlers={{
                  click: () => {
                    onSelectApartment(apartment.id)
                  },
                }}
              >
                <Popup>
                  <div className="max-w-[200px]">
                    <p className="font-semibold leading-snug">{apartment.title}</p>
                    <p className="mt-1 text-xs text-slate-600">
                      {apartment.address}, {apartment.city}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-cyan-700">
                      ₪{apartment.price.toLocaleString()} / mo
                    </p>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>

      {apartments.length > 0 && mappableApartments.length < apartments.length ? (
        <p className="mt-3 text-xs text-slate-500">
          Some listings are missing coordinates and cannot be shown on the map yet.
        </p>
      ) : null}
    </section>
  )
}

export default ApartmentMap
