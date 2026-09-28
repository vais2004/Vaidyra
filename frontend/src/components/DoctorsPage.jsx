import React, { useEffect, useMemo, useState } from "react";
import { doctorsPageStyles as s } from "../assets/dummyStyles";
import {
  ChevronRight,
  CircleChevronDown,
  CircleChevronUp,
  Medal,
  MousePointer2Off,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorsPage = () => {
  const API_BASE = "http://localhost:4000";

  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  //load doctors coming from the server
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/doctors`);
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            (json && json.message) || `Failed to load doctors (${res.status})`;
          if (mounted) {
            setError(msg);
            setAllDoctors([]);
            setLoading(false);
          }
          return;
        }

        const items = (json && (json.data || json)) || [];
        const normalized = (Array.isArray(items) ? items : []).map((d) => {
          const id = d._id || d.id;
          const image =
            d.imageUrl || d.image || d.imageSmall || d.imageSrc || "";
          let available = true;
          if (typeof d.availability === "string") {
            available = d.availability.toLowerCase() === "available";
          } else if (typeof d.available === "boolean") {
            available = d.available;
          } else if (typeof d.availability === "boolean") {
            available = d.availability;
          } else {
            available = d.availability === "Available" || d.available === true;
          }
          return {
            id,
            name: d.name || "Unknown",
            specialization: d.specialization || "",
            image,
            experience:
              (d.experience ?? d.experience === 0) ? String(d.experience) : "—",
            fee: d.fee ?? d.price ?? 0,
            available,
            raw: d,
          };
        });

        if (mounted) {
          setAllDoctors(normalized);
          setError("");
        }
      } catch (err) {
        console.error("load doctors error:", err);
        if (mounted) {
          setError("Network error while loading doctors.");
          setAllDoctors([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  //Derived filtered list
  const filteredDoctors = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allDoctors;
    return allDoctors.filter(
      (doctor) =>
        (doctor.name || "").toLowerCase().includes(q) ||
        (doctor.specialization || "").toLowerCase().includes(q),
    );
  }, [allDoctors, searchTerm]);

  //shows 8 then you can toggle
  const displayedDoctors = showAll
    ? filteredDoctors
    : filteredDoctors.slice(0, 8);

  //to retry to load from server
  const retry = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/doctors`);
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError((json && json.message) || `Failed to load (${res.status})`);
        setAllDoctors([]);
        return;
      }
      const items = (json && (json.data || json)) || [];
      const normalized = (Array.isArray(items) ? items : []).map((d) => {
        const id = d._id || d.id;
        const image = d.imageUrl || d.image || "";
        let available = true;
        if (typeof d.availability === "string") {
          available = d.availability.toLowerCase() === "available";
        } else if (typeof d.available === "boolean") {
          available = d.available;
        } else {
          available = d.availability === "Available" || d.available === true;
        }
        return {
          id,
          name: d.name || "Unknown",
          specialization: d.specialization || "",
          image,
          experience: d.experience ?? "—",
          fee: d.fee ?? d.price ?? 0,
          available,
          raw: d,
        };
      });
      setAllDoctors(normalized);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Network error while loading doctors.");
      setAllDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.backgroundShape1}></div>
      <div className={s.backgroundShape2}></div>

      <div className={s.wrapper}>
        <div className={s.headerContainer}>
          <h1 className={s.headerTitle}>Our Medical Experts</h1>
          <p className={s.headerSubtitle}>
            Find your ideal doctor by name or specialization
          </p>
        </div>
        <div className={s.searchContainer}>
          <div className={s.searchWrapper}>
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={s.searchInput}
            />
            <Search className={s.searchIcon} />
            {searchTerm.length > 0 && (
              <button
                onClick={() => setSearchTerm("")}
                className={s.clearButton}>
                <X size={20} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className={s.errorContainer}>
            <div className={s.errorText}>{error}</div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={retry} className={s.retryButton}>
                Retry
              </button>
            </div>
          </div>
        )}

        {/**loading */}
        {loading ? (
          <div className={s.skeletonGrid}>
            {Array.from({ length: 8 }).map((_, id) => (
              <div key={_} className={s.skeletonCard}>
                <div className={s.skeletonImage}></div>
                <div className={s.skeletonName}></div>
                <div className={s.skeletonSpecialization}></div>
                <div className={s.skeletonButton}></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`${s.doctorsGrid} ${filteredDoctors.length === 0 ? "opacity-70" : "opacity-100"}`}>
            {displayedDoctors.length > 0 ? (
              displayedDoctors.map((doctor, index) => (
                <div
                  key={doctor.id || `${doctor.name}-${index}`}
                  className={`${s.doctorCard} ${!doctor.available ? s.doctorCardUnavailable : ""}`}
                  style={{ animationDelay: `${index * 90}ms` }}
                  role="article">
                  {doctor.available ? (
                    <Link
                      to={`/doctors/${doctor.id}`}
                      state={{ doctor: doctor.raw || doctor }}
                      className={s.focusRing}>
                      <div className={s.imageContainer}>
                        <img
                          src={doctor.image || "/placeholder-doctor.jpg"}
                          alt={doctor.name}
                          loading="lazy"
                          className={s.doctorImage}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder-doctor.jpg";
                          }}
                        />
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`${s.imageContainer} ${s.imageContainerUnavailable}`}>
                      <img
                        src={doctor.image || "/placeholder-doctor.jpg"}
                        alt={doctor.name}
                        loading="lazy"
                        className={s.doctorImageUnavailable}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-doctor.jpg";
                        }}
                      />
                    </div>
                  )}
                  <h3 className={s.doctorName}>{doctor.name}</h3>
                  <p className={s.doctorSpecialization}>
                    {doctor.specialization}
                  </p>
                  <div className={s.experienceBadge}>
                    <Medal className={s.experienceIcon} />
                    <span>{doctor.experience || "-"} years Experience</span>
                  </div>
                  {doctor.available ? (
                    <Link
                      to={`/doctors/${doctor.id}`}
                      state={{ doctor: doctor.raw || doctor }}
                      className={s.bookButton}>
                      <ChevronRight className={s.bookButtonIcon} /> Book Now
                    </Link>
                  ) : (
                    <button disabled className={s.notAvailableButton}>
                      <MousePointer2Off className={s.notAvailableIcon} /> Not
                      Available
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className={s.noResults}>
                No doctors found matching your search criteria.
              </div>
            )}
          </div>
        )}
        {filteredDoctors.length > 8 && (
          <div className={s.showMoreContainer}>
            <button
              onClick={() => setShowAll(!showAll)}
              className={s.showMoreButton}>
              {showAll ? (
                <>
                  <CircleChevronUp className={s.showMoreIcon} />
                  Hide
                </>
              ) : (
                <>
                  <CircleChevronDown className={s.showMoreIcon} />
                  Show More
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.9s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.9s ease-out both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }

        @media (max-width: 420px) {
          .max-w-7xl { padding-left: 10px; padding-right: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default DoctorsPage;
