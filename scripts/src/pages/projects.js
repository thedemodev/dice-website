import { graphql } from 'gatsby';
import _ from 'lodash';
import React, { useMemo } from 'react';
import Layout from '../components/layout';
import Project from '../components/project';
import SEO from '../components/seo';

export default function Projects({
  data: {
    allRdf: { edges },
  },
}) {
  const projectsByType = useMemo(
    () =>
      _.groupBy(
        _.sortBy(edges, p => p.node.data.rdf_type[0].data.priority),
        p => p.node.data.rdf_type[0].data.name
      ),
    [edges]
  );

  return (
    <Layout>
      <SEO title="Projects" />
      <div className="content">
        {Object.keys(projectsByType).map(type => (
          <div
            key={type}
            className="tile is-vertical"
            style={{ marginBottom: '3em' }}
          >
            <h1 style={{ marginBottom: '1em' }}>{type}s</h1>
            <div className="columns is-multiline is-5 is-variable">
              {projectsByType[type].map(({ node }) => (
                <div className="column is-one-third" key={node.path}>
                  <Project key={node.path} project={node} renderType={false} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allRdf(
      filter: {
        data: {
          rdf_type: {
            elemMatch: {
              id: {
                in: [
                  "https://dice-research.org/FundedProject"
                  "https://dice-research.org/ProductionReadyProject"
                  "https://dice-research.org/IncubatorProject"
                  "https://dice-research.org/AlumniProject"
                ]
              }
            }
          }
        }
      }
    ) {
      edges {
        node {
          path
          data {
            rdf_type {
              data {
                name
                priority
              }
            }
            tagline
            status
            content
            endDate
            startDate
            name
            homepage
            logo
            sourceCode
          }
        }
      }
    }
  }
`;
