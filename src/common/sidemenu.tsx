
export const MENUITEMS = [
  {
    menutitle: "MENU",
    Items: [
      {
        title: "Dashboards",
        icon: (
          <i className="side-menu__icon bi bi-speedometer2"></i>
        ),
        path: `${import.meta.env.BASE_URL}dashboard/dashboard1`,
        type: "link",
        active: false,
        selected: false,
      },
      {
        title: "Masters",
        icon: (
          <i className="side-menu__icon bi bi-briefcase"></i>
        ),
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}society/societymaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Society",
            type: "link",
            active: false,
            selected: false,
          },
          //Added tower master
          {
            path: `${import.meta.env.BASE_URL}masters/towermaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Tower/Block",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${import.meta.env.BASE_URL}masters/wingmaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Wing",
            type: "link",
            selected: false,
            active: false,
          },
          {
            path: `${import.meta.env.BASE_URL}property/propertymaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Properties",
            type: "link",
            selected: false,
            active: false,
          },

          {
            path: `${import.meta.env.BASE_URL}members/membersmaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Members",
            type: "link",
            selected: false,
            active: false,
          },

          {
            path: `${import.meta.env.BASE_URL}vendor/vendormaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Vendor",
            type: "link",
            selected: false,
            active: false,
          },
          {
            path: `${import.meta.env.BASE_URL}masters/roles`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Roles",
            type: "link",
            selected: false,
            active: false,
          },


          {
            path: ``,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Permissions",
            type: "sub",
            selected: false,
            active: false,
            children: [
              {
                path: `${import.meta.env.BASE_URL}masters/mobileapp`,
                icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
                title: "Mobile App",
                type: "link",
                selected: false,
                active: false,
              },
              {
                path: `${import.meta.env.BASE_URL}masters/userpermission`,
                icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
                title: "User",
                type: "link",
                selected: false,
                active: false,
              },
            ]
          },


          {
            path: `${import.meta.env.BASE_URL}masters/termscondition`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Terms & Conditions",
            type: "link",
            selected: false,
            active: false,
          },

        ],
      },
      {
        title: "Parent Entity",
        icon: (
          <i className="side-menu__icon bi bi-diagram-2"></i>
        ),
        path: `${import.meta.env.BASE_URL}parententity`,
        type: "link",
        active: false,
        selected: false,
      },
      {
        title: "Accounts",
        icon: (
          <i className="side-menu__icon bi bi-calculator"></i>
        ),
        path: `${import.meta.env.BASE_URL}accounts/accounts`,
        type: "link",
        active: false,
        selected: false,
      },
      {
        title: "Applications",
        icon: (
          <i className="side-menu__icon bi bi-window-sidebar"></i>
        ),
        path: `${import.meta.env.BASE_URL}applications/applications`,
        type: "link",
        active: false,
        selected: false,
        // children: [
        //   {
        //    icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
        //     title: "Portfolio",
        //     type: "link",
        //     active: false,
        //     selected: false,
        //  },
        //   {
        //     path: `${import.meta.env.BASE_URL}admin/roles`,
        //     icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
        //     title: "Insights",
        //     type: "link",
        //     selected: false,
        //     active: false,
        //   },

        // ],
      },

      {
        title: "Complaints",
        icon: (<i className="side-menu__icon bi bi-piggy-bank"></i>
        ),
        path: `${import.meta.env.BASE_URL}complaints/complaints`,
        type: "link",
        selected: false,
        active: false,
      },

      {
        title: "Tenant",
        icon: (<i className="side-menu__icon bi bi-calendar-week"></i>
        ),
        path: `${import.meta.env.BASE_URL}tenant/tenant`,
        type: "link",
        selected: false,
        active: false,
      },


      {
        title: "Parking",
        icon: (<i className="side-menu__icon bi bi-list-task"></i>
        ),
        path: `${import.meta.env.BASE_URL}parking/parking`,
        type: "link",
        selected: false,
        active: false,
      },
      {
        title: "Loans",
        icon: (<i className="side-menu__icon bi bi-cash-stack"></i>
        ),
        path: `${import.meta.env.BASE_URL}loans/loans`,
        type: "link",
        selected: false,
        active: false,
      },
      {
        title: "Notices",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}notices/notices`,
        type: "link",
        selected: false,
        active: false,

      },
      {
        title: "Announcements",
        icon: (<i className="side-menu__icon bi bi-megaphone"></i>
        ),
        path: `${import.meta.env.BASE_URL}announcement/announcement`,
        type: "link",
        selected: false,
        active: false,

      },

      // {
      //   title: "Visitors",
      //   icon: (<i className="side-menu__icon bi bi-people"></i>
      //   ),
      //   path: ``,
      //   type: "link",
      //   selected: false,
      //   active: false,

      // },

      // {
      //   title: "Pets",
      //   icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
      //   ),
      //   path: ``,
      //   type: "link",
      //   selected: false,
      //   active: false,

      // },

      // {
      //   title: "Helpers",
      //   icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
      //   ),
      //   path: ``,
      //   type: "sub",
      //   selected: false,
      //   active: false,

      // },

      // {
      //   title: "Community",
      //   icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
      //   ),
      //   path: ``,
      //   type: "sub",
      //   selected: false,
      //   active: false,

      // },

      {
        title: "Approve Templates",
        icon: (
          <i className="side-menu__icon bi bi-file"></i>
        ),
        path: ``,
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            path: `${import.meta.env.BASE_URL}complaintstatus`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Complaint Status",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${import.meta.env.BASE_URL}gatepassapproval`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Gate Pass",
            type: "link",
            selected: false,
            active: false,
          },

          {
            path: `${import.meta.env.BASE_URL}celebrationbooking`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Celebration Booking",
            type: "link",
            selected: false,
            active: false,
          },

          // {
          //   path: ``,
          //   icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
          //   title: "Flate Resale",
          //   type: "link",
          //   selected: false,
          //   active: false,
          // },

        ],

      },

      {
        title: "Support",
        icon: (
          <i className="side-menu__icon bi bi-headset"></i>
        ),
        path: ``,
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Email",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: ``,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Phone",
            type: "link",
            selected: false,
            active: false,
          },

        ],

      },



    ]
  }]
