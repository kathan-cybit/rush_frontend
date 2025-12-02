import React, { useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Polygon,
} from "react-leaflet"
import { DivIcon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "./Button"
import { Pencil, Trash, Check, X } from "lucide-react"

interface Location {
  lat: number
  lng: number
  name: string
  area?: {
    points: Array<{ lat: number; lng: number }>
  }
}

interface LeafletMapPickerProps {
  initialLocation: Location
  onLocationChange: (location: Location) => void
}

function MapCenterUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng], 13)
  }, [lat, lng, map])
  return null
}

function MapClickHandler({
  isDrawingMode,
  onLocationSelect,
  onAreaPointAdd,
}: {
  isDrawingMode: boolean
  onLocationSelect: (lat: number, lng: number) => void
  onAreaPointAdd: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click: (e: any) => {
      const { lat, lng } = e.latlng
      isDrawingMode ? onAreaPointAdd(lat, lng) : onLocationSelect(lat, lng)
    },
  })
  return null
}

export function LeafletMapPicker({ initialLocation, onLocationChange }: LeafletMapPickerProps) {
  const [location, setLocation] = useState<Location>(initialLocation)
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [drawingPoints, setDrawingPoints] = useState<Array<{ lat: number; lng: number }>>([])
  const [isDrawing, setIsDrawing] = useState(false)

  const handleLocationSelect = (lat: number, lng: number) => {
    const name = `Location (${lat.toFixed(5)}, ${lng.toFixed(5)})`
    const newLocation = { ...location, lat, lng, name, area: undefined }
    setLocation(newLocation)
    onLocationChange(newLocation)
  }

  const handleAreaPointAdd = (lat: number, lng: number) => {
    if (!isDrawingMode) return
    if (!isDrawing) {
      setIsDrawing(true)
      setDrawingPoints([])
    }
    setDrawingPoints((prev) => [...prev, { lat, lng }])
  }

  const handleFinishDrawing = () => {
    if (drawingPoints.length < 3) return
    const centerLat = drawingPoints.reduce((sum, p) => sum + p.lat, 0) / drawingPoints.length
    const centerLng = drawingPoints.reduce((sum, p) => sum + p.lng, 0) / drawingPoints.length
    const name = `Area (${centerLat.toFixed(5)}, ${centerLng.toFixed(5)})`
    const newLocation = {
      ...location,
      lat: centerLat,
      lng: centerLng,
      name,
      area: { points: drawingPoints },
    }
    setLocation(newLocation)
    onLocationChange(newLocation)
    setIsDrawing(false)
    setIsDrawingMode(false)
  }

  const handleCancelDrawing = () => {
    setIsDrawing(false)
    setDrawingPoints([])
    setIsDrawingMode(false)
  }

  const handleClearArea = () => {
    const newLocation = { ...location, area: undefined }
    setLocation(newLocation)
    onLocationChange(newLocation)
  }

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <MapCenterUpdater lat={location.lat} lng={location.lng} />
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show marker */}
        {!location.area && !isDrawingMode && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>{location.name}</Popup>
          </Marker>
        )}

        {/* Show existing area */}
        {location.area && (
          <Polygon
            positions={location.area.points.map(({ lat, lng }) => [lat, lng])}
            pathOptions={{ color: "red", fillColor: "rgba(255, 0, 0, 0.2)" }}
          >
            <Popup>{location.name}</Popup>
          </Polygon>
        )}

        {/* Show drawing points and polygon */}
        {isDrawingMode && drawingPoints.length > 0 && (
          <>
            {drawingPoints.map((point, index) => (
              <Marker
                key={index}
                position={[point.lat, point.lng]}
                icon={new DivIcon({
                  html: `<div style="background-color:white;border:2px solid red;border-radius:50%;width:10px;height:10px;"></div>`,
                  iconSize: [10, 10],
                  className: "",
                })}
              />
            ))}
            {drawingPoints.length > 1 && (
              <Polygon
                positions={drawingPoints.map(({ lat, lng }) => [lat, lng])}
                pathOptions={{ color: "red", fillOpacity: 0.2, dashArray: "5, 5" }}
              />
            )}
          </>
        )}

        <MapClickHandler
          isDrawingMode={isDrawingMode}
          onLocationSelect={handleLocationSelect}
          onAreaPointAdd={handleAreaPointAdd}
        />
      </MapContainer>

      {/* Controls */}
      <div className="absolute top-2 right-2 z-[1000] flex flex-col gap-2">
        <Button
          type="button"
          size="sm"
          variant={isDrawingMode ? "default" : "outline"}
          className="h-8 w-8 p-0"
          onClick={() => {
            setIsDrawingMode((v) => !v)
            setIsDrawing(false)
            setDrawingPoints([])
          }}
          disabled={isDrawing || !!location.area}
          title={isDrawingMode ? "Cancel drawing" : "Draw area"}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        {!isDrawingMode && location.area && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleClearArea}
            title="Clear area"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isDrawing && (
        <div className="absolute bottom-2 right-2 z-[1000] flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="default"
            onClick={handleFinishDrawing}
            disabled={drawingPoints.length < 3}
          >
            <Check className="h-4 w-4 mr-1" />
            Finish
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={handleCancelDrawing}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>
      )}

      {isDrawingMode && !isDrawing && (
        <div className="absolute bottom-2 left-2 right-2 z-[1000] bg-white p-2 rounded-md border shadow-sm">
          <p className="text-sm text-slate-700">
            Click on the map to start drawing an area. Add at least 3 points to finish.
          </p>
        </div>
      )}
    </div>
  )
}
