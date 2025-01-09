import { Fragment } from 'react';

export default function Pageheader(Props: any) {
  return (
    <Fragment>

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">{Props.title}</span>
        </div>

      </div>
    </Fragment>
  );
}

