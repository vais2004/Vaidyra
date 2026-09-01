import React, { useEffect, useState } from "react";
import { homeDoctorsStyles as s, iconSize } from "../assets/dummyStyles";
import { Link } from "react-router-dom";
import { ChevronRight, MousePointer2Off, Medal } from "lucide-react";

const HomeDoctors = ({ previewCount = 8 }) => {
  const API_BASE = "http://localhost:4000";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //to fetch doctors from the server side

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
          if (!mounted) return;
          setError(msg);
          setDoctors([]);
          setLoading(false);
          return;
        }
        const items = (json && (json.data || json)) || [];
        const normalized = (Array.isArray(items) ? items : []).map((d) => {
          const id = d._id || d.id;
          const image =
            d.imageUrl || d.image || d.imageSmall || d.imageSrc || "";
          const available =
            (typeof d.availability === "string"
              ? d.availability.toLowerCase() === "available"
              : typeof d.available === "boolean"
                ? d.available
                : d.availability === true) || d.availability === "Available";
          return {
            id,
            name: d.name || "Unknown",
            specialization: d.specialization || "",
            image,
            experience:
              d.experience || d.experience === 0 ? String(d.experience) : "",
            fee: d.fee ?? d.price ?? 0,
            available,
            raw: d,
          };
        });

        if (!mounted) return;
        setDoctors(normalized);
      } catch (err) {
        if (!mounted) return;
        console.error("load doctors error:", err);
        setError("Network error while loading doctors.");
        setDoctors([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [API_BASE]);

  const preview = doctors.slice(0, previewCount);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <h1 className={s.title}>
            Our <span className={s.titleSpan}>Medical Team</span>
          </h1>
          <p className={s.subtitle}>
            Book appointments quickly with our verified specialists.
          </p>
        </div>
        {/* error / retry */}
        {error ? (
          <div className={s.errorContainer}>
            <div className={s.errorText}>{error}</div>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                (async () => {
                  try {
                    const res = await fetch(`${API_BASE}/api/doctors`);
                    const json = await res.json().catch(() => null);
                    const items = (json && (json.data || json)) || [];
                    const normalized = (Array.isArray(items) ? items : []).map(
                      (d) => {
                        const id = d._id || d.id;
                        const image = d.imageUrl || d.image || "";
                        const available =
                          (typeof d.availability === "string"
                            ? d.availability.toLowerCase() === "available"
                            : typeof d.available === "boolean"
                              ? d.available
                              : d.availability === true) ||
                          d.availability === "Available";
                        return {
                          id,
                          name: d.name || "Unknown",
                          specialization: d.specialization || "",
                          image,
                          experience: d.experience || "",
                          fee: d.fee ?? d.price ?? 0,
                          available,
                          raw: d,
                        };
                      },
                    );
                    setDoctors(normalized);
                    setError("");
                  } catch (err) {
                    console.error(err);
                    setError("Network error while loading doctors.");
                    setDoctors([]);
                  } finally {
                    setLoading(false);
                  }
                })();
              }}
              className={s.retryButton}>
              Retry
            </button>
          </div>
        ) : null}{" "}
        {/**so here it will re-fetch the api to get response  */}
        {loading ? (
          <div className={s.skeletonGrid}>
            {Array.from({ length: previewCount }).map((_, i) => (
              <div className={s.skeletonCard}>
                <div className={s.skeletonImage}></div>
                <div className={s.skeletonText1}></div>
                <div className={s.skeletonText2}></div>
                <div className="flex gap-2 mt-auto">
                  <div className={s.skeletonButton}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={s.doctorsGrid}>
            {preview.map((doctor) => (
              <article key={doctor.id || doctor.name} className={s.article}>
                {doctor.available ? (
                  <Link
                    to={`/doctors/${doctor.id}`}
                    state={{ doctor: doctor.raw || doctor }}>
                    <div className={s.imageContainerAvailable}>
                      <img
                        src={doctor.image || "/placeholder-doctor.jpg"}
                        alt={doctor.name}
                        loading="lazy"
                        className={s.image}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder-doctor.jpg";
                        }}
                      />
                    </div>
                  </Link>
                ) : (
                  <div className={s.imageContainerUnavailable}>
                    <img
                      src={doctor.image || "/placeholder-doctor.jpg"}
                      alt={doctor.name}
                      loading="lazy"
                      className={s.image}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder-doctor.jpg";
                      }}
                    />
                    <div className={s.unavailableBadge}>Not available</div>
                  </div>
                )}
                {/**body */}
                <div className={s.cardBody}>
                  <h3 className={s.doctorName} id={`doctor-${doctor.id}-name`}>
                    {doctor.name}
                  </h3>
                  <p className={s.specialization}>{doctor.specialization}</p>
                  <div className={s.experienceContainer}>
                    <div className={s.experienceBadge}>
                      <Medal className={`${iconSize.small} h-4`} />
                      <span>{doctor.experience} years Experience </span>
                    </div>
                  </div>
                  <div className={s.buttonContainer}>
                    <div className="w-full">
                      {doctor.available ? (
                        <Link
                          to={`/doctors/${doctor.id}`}
                          state={{ doctor: doctor.raw || doctor }}
                          className={s.buttonAvailable}>
                          <ChevronRight className="w-5 h-5" /> Book Now
                        </Link>
                      ) : (
                        <button disabled className={s.buttonUnavailable}>
                          <MousePointer2Off className="w-5 h-5" />
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <style>{s.customCSS}</style>
    </section>
  );
};

export default HomeDoctors;
