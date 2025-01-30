
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
            path: `${import.meta.env.BASE_URL}masters/flatmaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Flat",
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
            path: `${import.meta.env.BASE_URL}masters/roles`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Roles",
            type: "link",
            selected: false,
            active: false,
          },

          {
            path: `${import.meta.env.BASE_URL}membername/membernamemaster`,
            icon: (<i className="side-menu__icon bi bi-chevron-double-right"></i>),
            title: "Members Name",
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
        title: "Accounts",
        icon: (
          <i className="side-menu__icon bi bi-briefcase"></i>
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
        path: `${import.meta.env.BASE_URL}deals/deals`,
        type: "link",
        selected: false,
        active: false,
      },

      {
        title: "Tenant",
        icon: (<i className="side-menu__icon bi bi-calendar-week"></i>
        ),
        path: `${import.meta.env.BASE_URL}calendar/calendar`,
        type: "link",
        selected: false,
        active: false,
      },

      {
        title: "Vehicle",
        icon: (<i className="side-menu__icon bi bi-list-task"></i>
        ),
        path: `${import.meta.env.BASE_URL}task/task`,
        type: "link",
        selected: false,
        active: false,
      },
      {
        title: "Loans",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}chats/chats`,
        type: "link",
        selected: false,
        active: false,
      },
      {
        title: "Notices",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}document/document`,
        type: "link",
        selected: false,
        active: false,

      },
      {
        title: "Announcements",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}document/document`,
        type: "link",
        selected: false,
        active: false,

      },

      {
        title: "Visitors",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}document/document`,
        type: "link",
        selected: false,
        active: false,

      },

      {
        title: "Pets",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}document/document`,
        type: "link",
        selected: false,
        active: false,

      },

      {
        title: "Helpers",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}document/document`,
        type: "link",
        selected: false,
        active: false,

      },

      {
        title: "Community",
        icon: (<i className="side-menu__icon bi bi-file-earmark-text"></i>
        ),
        path: `${import.meta.env.BASE_URL}document/document`,
        type: "link",
        selected: false,
        active: false,

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
