import { awards } from "@/data/awards";
import React from "react";
export default function Awards() {
  return (
    <div className="container">
      <h2 className="section-title-medium font-alt text-outline-cont mt-20 mb-50 mb-md-30">
        <span className="text-outline-2">Experience</span>
        <span className="text-outline-1">Experience</span>
        <span className="text-outline">Experience</span>
      </h2>
      <hr className="mt-0 mb-40" />
      {/* Timeline Row */}
      {awards.map((item, index) => (
        <React.Fragment key={index}>
          <div className="row">
            <div className="col-md-3 mb-sm-20">
              <h3 className="section-title-inline rotate-5">{item.month}</h3>
            </div>
            <div className="col-md-8 offset-md-1">
              <h4 className="section-title-small mb-10">{item.company}</h4>
              <div className="mb-10">{item.title}</div>
              <div className="text-gray">{item.description}</div>
              {item.clients ? (
                <div className="mt-10">
                  Clients:{" "}
                  {item.clients.map((client, i) => (
                    <React.Fragment key={client.name}>
                      {i > 0 ? <span className="text-gray"> · </span> : null}
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>{client.name}</strong>
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <hr className="mt-40 mb-40" />
        </React.Fragment>
      ))}
    </div>
  );
}
