import { Metadata } from "next";

const globalMeta: Metadata = {
  robots: "noindex,follow",
  title: {
    default:
      "Front End / Full Stack Engineer in Portland, OR specializing in React, Typescript, Javascript, Node.Js and more",
    template: "%s | Jason Gallagher",
  },
  description:
    "Full Stack Engineer in Portland focused on React, Node.Js, Typescript, Javascript, Frontend, Backend, Devops, AWS, Serverless",

  // alternates: {
  //   canonical: "https://jasongallagher.org",
  // },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    // apple: [
    //   { url: '/apple-icon.png' },
    //   { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    // ],
  },
};

export default globalMeta;
