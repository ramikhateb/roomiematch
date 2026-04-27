import { useEffect, useMemo } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import { Icon, divIcon } from 'leaflet'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker1x from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import type { Apartment } from '../../types/apartment'

type ApartmentMapProps = {
  apartments: Apartment[]
  selectedApartmentId: string | null
  highlightedApartmentId?: string | null
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

function FlyToSelected({
  apartments,
  selectedApartmentId,
}: {
  apartments: Apartment[]
  selectedApartmentId: string | null
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedApartmentId) return
    const target = apartments.find((item) => item.id === selectedApartmentId)
    if (!target || typeof target.latitude !== 'number' || typeof target.longitude !== 'number') return
    map.flyTo([target.latitude, target.longitude], Math.max(map.getZoom(), 14), {
      animate: true,
      duration: 0.5,
    })
  }, [map, apartments, selectedApartmentId])

  return null
}

function ApartmentMap({
  apartments,
  selectedApartmentId,
  highlightedApartmentId = null,
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

  function getMarkerIcon(apartment: Apartment, isSelected: boolean) {
    return divIcon({
      className: 'apartment-map-marker-wrapper',
      html: `<button class="apartment-map-marker${isSelected ? ' is-selected' : ''}" type="button">₪${Number(apartment.price || 0).toLocaleString()}</button>`,
      iconSize: [76, 34],
      iconAnchor: [38, 17],
    })
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Map view</h2>
          <p className="mt-1 text-sm text-slate-600">
            Click a pin or an apartment card to sync the map and the grid.
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
          className="h-[460px] w-full sm:h-[560px] lg:h-[680px]"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; OpenStreetMap &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <FitMapBounds points={markerPoints} />
          <FlyToSelected apartments={mappableApartments} selectedApartmentId={selectedApartmentId} />

          {mappableApartments.map((apartment) => {
            const isSelected =
              apartment.id === highlightedApartmentId || apartment.id === selectedApartmentId
            return (
              <Marker
                key={apartment.id}
                position={[apartment.latitude!, apartment.longitude!]}
                zIndexOffset={isSelected ? 800 : 0}
                icon={getMarkerIcon(apartment, isSelected)}
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
          Some apartments are missing coordinates and cannot be shown on the map yet.
        </p>
      ) : null}
    </section>
  )
}

export default ApartmentMap
