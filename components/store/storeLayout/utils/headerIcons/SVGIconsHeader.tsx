import { motion } from 'framer-motion';
const MenueNormalStateSVG = (props) => {
  return (
    <motion.svg
      width="44"
      height="41"
      viewBox="0 0 44 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="menu-global-indecator-normat-state"
      initial="init"
      animate={props.animate ? 'animate' : 'exit'}
      variants={{ animat: { opacity: 1 }, exit: { opacity: 0 } }}
    >
      <g clip-path="url(#clip0_79_521)">
        <path
          d="M6.66797 11.6666C6.66797 10.9293 7.2653 10.3333 8.0013 10.3333L28.8343 10.3334C29.5703 10.3334 30.1676 10.9294 30.1676 11.6667C30.1676 12.404 29.5703 13 28.8343 13L8.0013 12.9999C7.2653 12.9999 6.66797 12.4039 6.66797 11.6666ZM35.501 19.6667L8.0013 19.6666C7.2653 19.6666 6.66797 20.2626 6.66797 20.9999C6.66797 21.7372 7.2653 22.3333 8.0013 22.3333L35.501 22.3334C36.237 22.3334 36.8343 21.7374 36.8343 21C36.8343 20.2627 36.237 19.6667 35.501 19.6667ZM23.501 29L8.0013 28.9999C7.2653 28.9999 6.66797 29.5959 6.66797 30.3333C6.66797 31.0706 7.2653 31.6666 8.0013 31.6666L23.501 31.6667C24.237 31.6667 24.8343 31.0707 24.8343 30.3334C24.8343 29.596 24.237 29 23.501 29Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_79_521">
          <rect
            width="31"
            height="22"
            fill="white"
            transform="translate(6 10)"
          />
        </clipPath>
      </defs>
    </motion.svg>
  );
};
// -------------------------------------------
const LogoSVG = () => {
  return (
    <svg
      width="142"
      height="36"
      viewBox="0 0 142 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.59856 10.9503L0 4.8668V35.6899H0.82482C4.01357 35.6899 6.59856 33.1478 6.59856 30.0119V18.6561L11.5475 28.3897C13.1971 32.4453 16.2525 35.6899 20.8025 35.6899H38.5846C43.696 35.6899 47.8396 31.6612 47.8396 26.6916V24.7697C47.8396 20.1957 45.5171 15.9167 41.6336 13.3352L34.6416 8.6876L27.4012 13.4517C23.5998 15.9531 21.3224 20.1252 21.3224 24.588V26.6916H27.3538V24.588C27.3538 22.0714 28.638 19.7187 30.7817 18.3082L34.6244 15.7797L38.2296 18.1761C40.469 19.6646 41.8082 22.1321 41.8082 24.7697V26.6916C41.8082 28.4226 40.3649 29.8258 38.5846 29.8258H20.8025C19.0221 29.8258 17.5788 28.4226 17.5788 26.6916V8.99829C17.5788 7.2673 19.0221 5.86406 20.8025 5.86406H41.8082L47.8396 10.2115V8.11133C47.8396 3.63157 44.1467 0 39.5914 0H20.8025C15.6911 0 11.5475 4.02867 11.5475 8.99829V15.4115L6.59856 10.9503Z"
        fill="black"
      />
      <path
        d="M141.261 25.3759L140.877 27.5422L140.718 27.6205C138.774 27.4465 136.686 27.3595 134.455 27.3595H128.486V26.4721L136.988 13.0308L139.045 9.97714H136.513C134.659 9.97714 133.091 10.0641 131.81 10.2381C130.544 10.4121 129.511 10.6992 128.712 11.0994L128.464 10.995L128.848 8.90705L129.006 8.82875C130.227 9.00275 132.601 9.08975 136.129 9.08975H141.012V9.97714L131.968 24.2797L130.431 26.4721H134.817C136.294 26.4721 137.508 26.4025 138.457 26.2633C139.407 26.1067 140.274 25.7935 141.058 25.3237L141.261 25.3759Z"
        fill="black"
      />
      <path
        d="M116.463 27.751C114.835 27.751 113.335 27.3508 111.964 26.5504C110.607 25.75 109.529 24.6277 108.73 23.1835C107.931 21.7394 107.532 20.0951 107.532 18.2507C107.532 16.4063 107.909 14.7621 108.662 13.3179C109.416 11.8563 110.471 10.7253 111.828 9.92494C113.2 9.10715 114.767 8.69826 116.531 8.69826C118.174 8.69826 119.681 9.09845 121.053 9.89884C122.425 10.6992 123.51 11.8215 124.309 13.2657C125.108 14.7099 125.507 16.3541 125.507 18.1985C125.507 20.0429 125.123 21.6959 124.354 23.1574C123.601 24.6016 122.538 25.7326 121.166 26.5504C119.794 27.3508 118.227 27.751 116.463 27.751ZM116.305 26.9158C117.677 26.9158 118.905 26.5591 119.99 25.8457C121.076 25.1149 121.927 24.0622 122.545 22.6876C123.178 21.3131 123.495 19.6949 123.495 17.8331C123.495 16.2497 123.209 14.8317 122.636 13.5789C122.063 12.3087 121.264 11.3169 120.239 10.6035C119.214 9.89014 118.046 9.53344 116.734 9.53344C115.393 9.53344 114.172 9.89884 113.071 10.6296C111.986 11.343 111.127 12.387 110.494 13.7616C109.861 15.1362 109.544 16.7543 109.544 18.6161C109.544 20.1821 109.831 21.6002 110.403 22.8703C110.991 24.1405 111.798 25.1323 112.823 25.8457C113.848 26.5591 115.008 26.9158 116.305 26.9158Z"
        fill="black"
      />
      <path
        d="M101.963 10.0293V26.446C103.004 26.6722 103.765 26.8288 104.247 26.9158L104.179 27.4378C103.501 27.3856 102.468 27.3595 101.082 27.3595C99.6647 27.3595 98.6246 27.3856 97.9614 27.4378L97.9162 26.8897L100.064 26.4199V18.4334L95.7682 18.5639H90.0929V26.446C91.133 26.6722 91.8942 26.8288 92.3766 26.9158L92.3087 27.4378C91.6304 27.3856 90.5979 27.3595 89.2111 27.3595C87.7941 27.3595 86.7541 27.3856 86.0908 27.4378L86.0456 26.8897L88.1936 26.4199V10.0032L86.0456 9.55954L86.1134 9.01145C86.7917 9.06365 87.8017 9.08975 89.1432 9.08975C90.6054 9.08975 91.6606 9.06365 92.3087 9.01145L92.3766 9.53344L90.0929 10.0293V17.7548L94.4567 17.6243H100.064V10.0032L97.9162 9.55954L97.984 9.01145C98.6623 9.06365 99.6723 9.08975 101.014 9.08975C102.476 9.08975 103.531 9.06365 104.179 9.01145L104.247 9.53344L101.963 10.0293Z"
        fill="black"
      />
      <path
        d="M78.831 17.7548C80.052 17.9984 81.0092 18.5552 81.7026 19.4252C82.411 20.2952 82.7653 21.3218 82.7653 22.5049C82.7653 24.0013 82.2603 25.1845 81.2504 26.0545C80.2555 26.9245 78.7255 27.3595 76.6604 27.3595H72.1835C71.2338 27.3595 70.2616 27.3856 69.2667 27.4378L69.1989 26.9158L71.3469 26.4721V10.0032L69.1989 9.55954L69.2667 9.01145C70.2616 9.06365 71.5881 9.08975 73.2462 9.08975H76.0273C77.8965 9.08975 79.2983 9.50734 80.2329 10.3425C81.1675 11.1603 81.6348 12.2913 81.6348 13.7355C81.6348 14.6403 81.3936 15.4668 80.9112 16.2149C80.4288 16.9457 79.7355 17.459 78.831 17.7548ZM75.2812 9.92494L73.2462 10.0815V17.5199H75.8916C77.0825 17.5199 78.0095 17.1806 78.6728 16.502C79.3511 15.8234 79.6902 14.91 79.6902 13.7616C79.6902 12.6132 79.3511 11.691 78.6728 10.995C77.9944 10.2816 77.0674 9.92494 75.8916 9.92494H75.2812ZM76.4569 26.5243C77.904 26.5243 78.9818 26.1502 79.6902 25.402C80.4138 24.6364 80.7755 23.6533 80.7755 22.4527C80.7755 21.2522 80.4062 20.2778 79.6676 19.5296C78.9441 18.764 77.8437 18.3812 76.3665 18.3812H73.2462V26.5243H76.4569Z"
        fill="black"
      />
      <path
        d="M63.2034 27.4622L53.1416 12.8725L51.785 10.7584C51.7096 10.6366 51.6343 10.5757 51.5589 10.5757C51.4684 10.5757 51.4232 10.6714 51.4232 10.8628V15.8478C51.4232 19.4148 51.6343 23.234 52.0563 27.3055L52.0111 27.4622L51.0841 27.4361C50.7524 27.4361 50.4434 27.4447 50.157 27.4622L50.1118 27.3055C50.5037 23.9996 50.6997 20.1804 50.6997 15.8478V10.0798L48.5517 9.63612L48.6195 9.11413C49.4184 9.16633 50.2475 9.19243 51.1067 9.19243C51.8754 9.19243 52.501 9.16633 52.9834 9.11413L61.9598 22.1378L63.5651 24.5912C63.6556 24.713 63.7234 24.7739 63.7686 24.7739C63.8591 24.7739 63.9043 24.6782 63.9043 24.4868V20.7024C63.9043 17.205 63.6933 13.4032 63.2712 9.29683L63.339 9.16633L64.2887 9.19243C64.6052 9.19243 64.8992 9.18373 65.1705 9.16633L65.2383 9.29683C64.8313 12.5506 64.6278 16.3524 64.6278 20.7024V27.4622H63.2034Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M142 24.8228L141.426 28.0592L140.824 28.3571L140.67 28.3433C138.743 28.1709 136.672 28.0845 134.455 28.0845H127.858V26.2356L136.486 12.5944L137.761 10.7021H136.513C134.674 10.7021 133.132 10.7885 131.883 10.9581C130.653 11.1272 129.685 11.4021 128.962 11.7645L128.732 11.8795L127.735 11.4609L128.301 8.38873L128.914 8.08523L129.083 8.10923C130.259 8.27691 132.596 8.36476 136.128 8.36476H141.64V10.2136L132.466 24.7218L131.747 25.7471H134.817C136.277 25.7471 137.46 25.6782 138.373 25.5448C139.257 25.3985 140.053 25.1086 140.768 24.6803L140.971 24.5588L142 24.8228ZM138.457 26.2633C137.508 26.4025 136.294 26.4721 134.817 26.4721H130.431L131.968 24.2797L141.012 9.97714V9.08975H136.129C132.601 9.08975 130.227 9.00275 129.006 8.82875L128.848 8.90705L128.464 10.995L128.712 11.0994C128.732 11.0897 128.751 11.08 128.771 11.0704C128.883 11.0158 128.999 10.9634 129.12 10.9131C129.853 10.6088 130.75 10.3838 131.81 10.2381C133.091 10.0641 134.659 9.97714 136.513 9.97714H139.045L136.988 13.0308L128.486 26.4721V27.3595H134.455C136.686 27.3595 138.774 27.4465 140.718 27.6205L140.877 27.5422L141.261 25.3759L141.058 25.3237C141.056 25.3247 141.054 25.3257 141.052 25.3266C140.899 25.4184 140.742 25.5042 140.583 25.5839C139.928 25.9112 139.219 26.1376 138.457 26.2633Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M111.68 27.1974L111.677 27.1959C110.224 26.3385 109.061 25.1294 108.2 23.5737C107.332 22.0041 106.903 20.2223 106.903 18.2507C106.903 16.2878 107.306 14.5123 108.123 12.9451C108.939 11.3634 110.083 10.14 111.54 9.28008C113.013 8.40253 114.681 7.97327 116.531 7.97327C118.265 7.97327 119.87 8.39666 121.336 9.25182C122.804 10.1087 123.976 11.3178 124.838 12.8755C125.706 14.4452 126.135 16.2269 126.135 18.1985C126.135 20.1643 125.724 21.9489 124.891 23.5325L124.891 23.5337L124.354 23.1574L124.892 23.5315L124.891 23.5325C124.074 25.0979 122.922 26.319 121.454 27.1945L121.449 27.1974C119.977 28.0561 118.31 28.476 116.463 28.476C114.742 28.476 113.145 28.0521 111.68 27.1974ZM108.662 13.3179C107.909 14.7621 107.532 16.4063 107.532 18.2507C107.532 20.0951 107.931 21.7394 108.73 23.1835C109.529 24.6277 110.607 25.75 111.964 26.5504C113.335 27.3508 114.835 27.751 116.463 27.751C118.227 27.751 119.794 27.3508 121.166 26.5504C122.538 25.7326 123.601 24.6016 124.354 23.1574C125.123 21.6959 125.507 20.0429 125.507 18.1985C125.507 16.3541 125.108 14.7099 124.309 13.2657C123.51 11.8215 122.425 10.6992 121.053 9.89884C119.681 9.09845 118.174 8.69826 116.531 8.69826C114.767 8.69826 113.2 9.10715 111.828 9.92494C110.471 10.7253 109.416 11.8563 108.662 13.3179ZM113.071 10.6296C111.986 11.343 111.127 12.387 110.494 13.7616C109.861 15.1362 109.544 16.7543 109.544 18.6161C109.544 20.1821 109.831 21.6002 110.403 22.8703C110.991 24.1405 111.798 25.1323 112.823 25.8457C113.848 26.5591 115.008 26.9158 116.305 26.9158C117.677 26.9158 118.905 26.5591 119.99 25.8457C121.076 25.1149 121.927 24.0622 122.545 22.6876C123.178 21.3131 123.495 19.6949 123.495 17.8331C123.495 16.2497 123.209 14.8317 122.636 13.5789C122.063 12.3087 121.264 11.3169 120.239 10.6035C119.214 9.89014 118.046 9.53344 116.734 9.53344C115.393 9.53344 114.172 9.89884 113.071 10.6296ZM119.676 25.2175C118.696 25.8615 117.577 26.1908 116.304 26.1908C115.113 26.1908 114.066 25.8645 113.147 25.2248C112.224 24.5825 111.495 23.6904 110.959 22.532C110.438 21.3756 110.172 20.0752 110.172 18.6161C110.172 16.8499 110.472 15.353 111.048 14.1019C111.63 12.8385 112.408 11.8996 113.382 11.2596L113.384 11.258C114.384 10.5941 115.496 10.2584 116.734 10.2584C117.942 10.2584 118.996 10.5856 119.914 11.2244C120.837 11.8663 121.557 12.7572 122.078 13.9136L122.08 13.9173C122.6 15.054 122.867 16.3536 122.867 17.8331C122.867 19.5993 122.567 21.0962 121.99 22.3473L121.987 22.3537C121.421 23.6139 120.651 24.5607 119.676 25.2175Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M102.994 9.06779C102.448 9.08243 101.788 9.08975 101.014 9.08975C100.271 9.08975 99.6302 9.08176 99.0909 9.06577C98.6638 9.05311 98.3003 9.03543 98.0006 9.01274C97.9949 9.01232 97.9896 9.01189 97.984 9.01145L97.9162 9.55954L100.064 10.0032V17.6243H94.4567L90.0929 17.7548V10.0293L92.3766 9.53344L92.3087 9.01145C92.3031 9.01191 92.2971 9.01236 92.2913 9.01281C91.9888 9.0367 91.5994 9.05503 91.1233 9.06779C90.5773 9.08243 89.9175 9.08975 89.1432 9.08975C88.4009 9.08975 87.7596 9.08176 87.2203 9.06577C86.7932 9.05311 86.4297 9.03543 86.13 9.01274C86.1243 9.01232 86.119 9.01189 86.1134 9.01145L86.0456 9.55954L88.1936 10.0032V26.4199L86.0456 26.8897L86.0908 27.4378C86.1054 27.4366 86.1197 27.4355 86.1346 27.4344C86.4119 27.4135 86.7519 27.3971 87.1546 27.3849C87.7175 27.368 88.4032 27.3595 89.2111 27.3595C89.8953 27.3595 90.4929 27.3658 91.0047 27.3785C91.5287 27.3915 91.9624 27.4112 92.3056 27.4376L92.3087 27.4378L92.3766 26.9158C92.3644 26.9136 92.3514 26.9113 92.3389 26.909C92.026 26.852 91.6025 26.7673 91.0682 26.655C90.776 26.5936 90.4512 26.5239 90.0929 26.446V18.5639H95.7682L100.064 18.4334V26.4199L97.9162 26.8897L97.9614 27.4378C97.9759 27.4366 97.9903 27.4355 98.0052 27.4344C98.2825 27.4135 98.6225 27.3971 99.0252 27.3849C99.5881 27.368 100.274 27.3595 101.082 27.3595C101.766 27.3595 102.363 27.3658 102.875 27.3785C103.399 27.3915 103.833 27.4112 104.176 27.4376L104.179 27.4378L104.247 26.9158C104.235 26.9136 104.222 26.9113 104.209 26.909C103.897 26.852 103.473 26.7673 102.939 26.655C102.647 26.5936 102.322 26.5239 101.963 26.446V10.0293L104.247 9.53344L104.179 9.01145C104.174 9.01191 104.168 9.01236 104.162 9.01281C103.859 9.0367 103.47 9.05503 102.994 9.06779ZM102.591 10.6307L104.958 10.1168L104.714 8.24161L104.135 8.28822C103.511 8.33852 102.474 8.36476 101.013 8.36476C99.6752 8.36476 98.6822 8.33861 98.0254 8.28807L97.4442 8.24335L97.2083 10.1499L99.4357 10.61V16.8993H94.4482L90.7206 17.0108V10.6307L93.0871 10.1168L92.8434 8.24161L92.2646 8.28822C91.6401 8.33852 90.6038 8.36476 89.1429 8.36476C87.8046 8.36476 86.8116 8.33861 86.1548 8.28807L85.5737 8.24335L85.3377 10.1499L87.5651 10.61V25.8194L85.3657 26.3004L85.5232 28.2091L86.1332 28.1611C86.7738 28.1107 87.7959 28.0845 89.2107 28.0845C90.5947 28.0845 91.6101 28.1106 92.2666 28.1611L92.8437 28.2056L93.0899 26.3107L92.4732 26.1995C92.0825 26.129 91.4993 26.0108 90.7206 25.844V19.2889H95.7761L99.4357 19.1777V25.8194L97.2363 26.3004L97.3937 28.2091L98.0038 28.1611C98.6443 28.1107 99.6664 28.0845 101.081 28.0845C102.465 28.0845 103.481 28.1106 104.137 28.1611L104.714 28.2056L104.96 26.3107L104.344 26.1995C103.953 26.129 103.37 26.0108 102.591 25.844V10.6307Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M71.3469 26.4721V10.0032L69.1989 9.55954L69.2667 9.01145C69.2724 9.01175 69.2777 9.01204 69.2834 9.01234C69.5944 9.0285 69.9376 9.04214 70.313 9.05324C71.136 9.07758 72.114 9.08975 73.2462 9.08975H76.0273C77.8965 9.08975 79.2983 9.50734 80.2329 10.3425C81.1675 11.1603 81.6348 12.2913 81.6348 13.7355C81.6348 14.6403 81.3936 15.4668 80.9112 16.2149C80.6253 16.648 80.265 17.0047 79.8309 17.285C79.5325 17.4777 79.1995 17.6343 78.831 17.7548C79.2075 17.8299 79.5584 17.9348 79.8847 18.0694C80.6168 18.3715 81.223 18.8234 81.7026 19.4252C82.411 20.2952 82.7653 21.3218 82.7653 22.5049C82.7653 24.0013 82.2603 25.1845 81.2504 26.0545C80.2555 26.9245 78.7255 27.3595 76.6604 27.3595H72.1835C71.6253 27.3595 71.0589 27.3685 70.4851 27.3865C70.087 27.399 69.685 27.4159 69.2794 27.4371C69.275 27.4373 69.2711 27.4375 69.2667 27.4378L69.1989 26.9158L71.3469 26.4721ZM81.6274 26.634C80.4724 27.6429 78.779 28.0845 76.66 28.0845H72.1831C71.2434 28.0845 70.2807 28.1103 69.2949 28.162L68.7292 28.1917L68.4868 26.3263L70.7185 25.8653V10.61L68.491 10.1499L68.7252 8.25732L69.2949 8.28721C70.2761 8.33869 71.5919 8.36476 73.2458 8.36476H76.0269C77.9582 8.36476 79.5222 8.79244 80.6144 9.76697C81.7158 10.732 82.2625 12.0833 82.2625 13.7355C82.2625 14.8013 81.9751 15.7786 81.4147 16.6478L81.4105 16.6543C81.1686 17.0208 80.8848 17.3372 80.5627 17.6055C81.1784 17.9309 81.7146 18.3707 82.1621 18.9314C82.9775 19.9339 83.393 21.1366 83.393 22.5049C83.393 24.2216 82.8003 25.6228 81.6274 26.634ZM78.261 15.9542C78.7858 15.4292 79.0618 14.7253 79.0618 13.7616C79.0618 12.7979 78.7855 12.0811 78.2551 11.5369L78.2494 11.531C77.7164 10.9705 76.956 10.6499 75.8913 10.6499H75.3017L73.8739 10.7598V16.7949H75.8913C76.982 16.7949 77.7419 16.4852 78.2558 15.9595L78.261 15.9542ZM73.2462 10.0815L75.2812 9.92494H75.8916C77.0674 9.92494 77.9944 10.2816 78.6728 10.995C79.3511 11.691 79.6902 12.6132 79.6902 13.7616C79.6902 14.91 79.3511 15.8234 78.6728 16.502C78.0095 17.1806 77.0825 17.5199 75.8916 17.5199H73.2462V10.0815ZM79.2479 20.0693L79.2429 20.064C78.6817 19.4703 77.7635 19.1062 76.3661 19.1062H73.8739V25.7993H76.4565C77.8238 25.7993 78.7194 25.4439 79.2655 24.8676C79.8508 24.2483 80.1471 23.4638 80.1471 22.4527C80.1471 21.447 79.847 20.6762 79.253 20.0745L79.2479 20.0693ZM79.6902 25.402C78.9818 26.1502 77.904 26.5243 76.4569 26.5243H73.2462V18.3812H76.3665C77.8437 18.3812 78.9441 18.764 79.6676 19.5296C80.4062 20.2778 80.7755 21.2522 80.7755 22.4527C80.7755 23.6533 80.4138 24.6364 79.6902 25.402Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M62.9002 28.1871L52.643 13.3141L52.0509 12.3914V15.8478C52.0509 19.3821 52.26 23.1723 52.6796 27.2194L52.6963 27.3807L52.4597 28.2L51.0761 28.161C50.7567 28.1612 50.4614 28.1696 50.1896 28.1861L49.712 28.2151L49.4693 27.3746L49.4891 27.2073C49.8762 23.9418 50.0712 20.1566 50.0712 15.8478V10.6866L47.8396 10.2256L48.0829 8.35295L48.6546 8.3903C49.4409 8.44167 50.2581 8.46744 51.1063 8.46744C51.8654 8.46744 52.4693 8.44154 52.9243 8.3923L53.2628 8.35568L62.4558 21.6936L63.2758 22.9468V20.7023C63.2758 17.2381 63.0668 13.4652 62.6471 9.38224L62.6218 9.13624L62.9881 8.4315L64.2957 8.46744C64.5996 8.4673 64.8793 8.45887 65.1353 8.44245L65.5137 8.41819L65.8915 9.14506L65.8596 9.40043C65.458 12.6109 65.2555 16.3767 65.2555 20.7023V28.1871H62.9002ZM63.9043 24.4868C63.9043 24.6782 63.8591 24.7739 63.7686 24.7739C63.7234 24.7739 63.6556 24.713 63.5651 24.5912L61.9598 22.1378L52.9834 9.11413C52.501 9.16633 51.8754 9.19243 51.1067 9.19243C50.6909 9.19243 50.2817 9.18631 49.8801 9.17409C49.4562 9.16119 49.0402 9.14148 48.6321 9.11497C48.6277 9.11469 48.6238 9.11441 48.6195 9.11413L48.5517 9.63612L50.6997 10.0798V15.8478C50.6997 19.9333 50.525 23.5624 50.1765 26.7351C50.1642 26.8476 50.1516 26.9596 50.1388 27.0709C50.1298 27.1494 50.121 27.2276 50.1118 27.3055L50.157 27.4622C50.4434 27.4447 50.7524 27.4361 51.0841 27.4361L52.0111 27.4622L52.0563 27.3055C52.0446 27.1923 52.0326 27.0792 52.0212 26.9662C52.0134 26.8896 52.0058 26.8131 51.9982 26.7366C51.6146 22.8777 51.4232 19.2481 51.4232 15.8478V10.8628C51.4232 10.6714 51.4684 10.5757 51.5589 10.5757C51.6343 10.5757 51.7096 10.6366 51.785 10.7584L53.1416 12.8725L63.2034 27.4622H64.6278V20.7024C64.6278 16.6152 64.8071 13.012 65.1664 9.89261C65.1754 9.81429 65.1845 9.73627 65.1938 9.65857C65.2082 9.53724 65.2233 9.41666 65.2383 9.29683L65.1705 9.16633C64.8992 9.18373 64.6052 9.19243 64.2887 9.19243L63.339 9.16633L63.2712 9.29683C63.2896 9.47613 63.3073 9.65485 63.3249 9.83299C63.3268 9.85244 63.3287 9.87187 63.3306 9.8913C63.7128 13.7707 63.9043 17.3744 63.9043 20.7024V24.4868Z"
        fill="black"
      />
    </svg>
  );
};

// -------------------------------------------------
const SearchSVG = (props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.663 25.9767L23.2137 21.56C24.9408 19.4049 25.7771 16.6695 25.5508 13.9163C25.3245 11.163 24.0528 8.60118 21.997 6.75751C19.9412 4.91384 17.2578 3.92848 14.4983 4.00405C11.7389 4.07961 9.11331 5.21035 7.16137 7.16377C5.20944 9.11719 4.07955 11.7448 4.00404 14.5063C3.92854 17.2678 4.91315 19.9534 6.75542 22.0107C8.59769 24.068 11.1576 25.3407 13.9087 25.5672C16.6599 25.7937 19.3932 24.9567 21.5466 23.2283L25.96 27.645C26.0715 27.7575 26.2042 27.8468 26.3503 27.9077C26.4964 27.9686 26.6532 28 26.8115 28C26.9698 28 27.1266 27.9686 27.2727 27.9077C27.4189 27.8468 27.5515 27.7575 27.663 27.645C27.8792 27.4212 28 27.1221 28 26.8108C28 26.4996 27.8792 26.2005 27.663 25.9767ZM14.8186 23.2283C13.1583 23.2283 11.5352 22.7355 10.1546 21.8124C8.77408 20.8892 7.69807 19.5771 7.06267 18.0419C6.42727 16.5068 6.26102 14.8175 6.58495 13.1878C6.90887 11.5581 7.70842 10.0611 8.88248 8.88619C10.0565 7.71124 11.5524 6.91108 13.1809 6.58691C14.8093 6.26274 16.4973 6.42912 18.0313 7.065C19.5653 7.70088 20.8764 8.77771 21.7988 10.1593C22.7213 11.5409 23.2137 13.1652 23.2137 14.8269C23.2137 17.0551 22.3292 19.192 20.7548 20.7675C19.1804 22.3431 17.0451 23.2283 14.8186 23.2283Z"
        fill={props.fill}
      />
    </svg>
  );
};

// -------------------------------------------------
const WishlistSVG = (props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.7963 7.07956C25.1124 5.09388 22.7694 4 20.1975 4C18.7152 4 17.2811 4.33729 16.0003 4.97898C14.7209 4.33729 13.2854 4 11.8031 4C9.23124 4 6.88819 5.09388 5.20437 7.07956C3.38012 9.23072 2.6234 12.1675 3.17861 14.9364C4.47105 21.3722 11.1777 25.845 14.0019 27.4694C14.6182 27.8218 15.3086 28 15.999 28C16.6894 28 17.3812 27.8219 17.9975 27.4682C20.8216 25.845 27.5283 21.3722 28.8207 14.9364C29.3772 12.1675 28.6205 9.23072 26.7963 7.07956ZM26.2684 14.4514C25.1775 19.883 19.195 23.843 16.6739 25.2931C16.2591 25.5306 15.7416 25.5306 15.3268 25.2931C12.8056 23.843 6.82188 19.883 5.73228 14.4514C5.324 12.4165 5.87661 10.2602 7.21326 8.68503C8.39389 7.29177 10.0244 6.52632 11.8044 6.52632C13.0657 6.52632 14.2749 6.86357 15.3008 7.50021C15.7273 7.76421 16.2734 7.76421 16.6998 7.50021C17.727 6.86357 18.935 6.52632 20.1962 6.52632C21.9775 6.52632 23.608 7.29177 24.7874 8.68503C26.124 10.2602 26.6779 12.4165 26.2684 14.4514Z"
        fill={props.fill}
      />
    </svg>
  );
};

// -------------------------------------------------
const BasketSVG = (props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.4187 8.86274H22.7567L20.6732 4.73628C20.6095 4.58444 20.515 4.44728 20.3956 4.33335C20.2761 4.21943 20.1343 4.1312 19.979 4.07418C19.8236 4.01716 19.6581 3.99257 19.4928 4.00195C19.3274 4.01132 19.1658 4.05447 19.018 4.12868C18.8702 4.2029 18.7394 4.30659 18.6338 4.43328C18.5282 4.55996 18.45 4.70692 18.4042 4.86497C18.3583 5.02302 18.3458 5.18876 18.3674 5.35184C18.3889 5.51491 18.4441 5.67182 18.5295 5.81275L20.059 8.86274H11.9177L13.4472 5.81275C13.5641 5.53395 13.5705 5.22155 13.4651 4.93828C13.3597 4.65501 13.1502 4.42183 12.8789 4.28556C12.6075 4.14929 12.2943 4.12001 12.0021 4.20362C11.7098 4.28722 11.4603 4.47751 11.3035 4.73628L9.22003 8.86274H7.55805C6.70682 8.8756 5.8875 9.18657 5.24459 9.74082C4.60169 10.2951 4.1765 11.057 4.04402 11.8922C3.91154 12.7274 4.08028 13.5822 4.52047 14.3059C4.96067 15.0296 5.64404 15.5757 6.45007 15.8478L7.34127 24.7705C7.43114 25.6587 7.85112 26.4817 8.5192 27.0789C9.18727 27.676 10.0555 28.0044 10.9543 28H21.0466C21.9453 28.0044 22.8135 27.676 23.4816 27.0789C24.1497 26.4817 24.5697 25.6587 24.6595 24.7705L25.5508 15.8478C26.3585 15.5749 27.043 15.0268 27.4829 14.3007C27.9227 13.5746 28.0897 12.7173 27.9541 11.8806C27.8185 11.044 27.3891 10.282 26.742 9.72963C26.0949 9.17726 25.2719 8.87017 24.4187 8.86274ZM22.2388 24.5313C22.2089 24.8274 22.0689 25.1017 21.8462 25.3008C21.6235 25.4998 21.3341 25.6093 21.0345 25.6078H10.9422C10.6426 25.6093 10.3532 25.4998 10.1305 25.3008C9.90784 25.1017 9.76785 24.8274 9.73789 24.5313L8.88282 16.0392H23.0939L22.2388 24.5313ZM24.4187 13.647H7.55805C7.23865 13.647 6.93232 13.521 6.70646 13.2967C6.48061 13.0724 6.35372 12.7682 6.35372 12.451C6.35372 12.1337 6.48061 11.8295 6.70646 11.6052C6.93232 11.3809 7.23865 11.2549 7.55805 11.2549H24.4187C24.7381 11.2549 25.0444 11.3809 25.2703 11.6052C25.4961 11.8295 25.623 12.1337 25.623 12.451C25.623 12.7682 25.4961 13.0724 25.2703 13.2967C25.0444 13.521 24.7381 13.647 24.4187 13.647Z"
        fill={props.fill}
      />
    </svg>
  );
};

// -------------------------------------------------
const ProfileSVG = (props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4561 16.8512C21.6384 15.9261 22.5013 14.6576 22.9249 13.222C23.3485 11.7865 23.3116 10.2553 22.8195 8.84156C22.3273 7.42782 21.4043 6.2018 20.1788 5.33405C18.9534 4.46631 17.4864 4 15.9821 4C14.4778 4 13.0109 4.46631 11.7854 5.33405C10.56 6.2018 9.63695 7.42782 9.14477 8.84156C8.6526 10.2553 8.61573 11.7865 9.03931 13.222C9.46289 14.6576 10.3259 15.9261 11.5081 16.8512C9.48227 17.6584 7.71464 18.9972 6.39367 20.7249C5.07271 22.4525 4.24793 24.5043 4.00727 26.6615C3.98985 26.819 4.0038 26.9784 4.04831 27.1305C4.09282 27.2827 4.16702 27.4246 4.26668 27.5482C4.46796 27.7979 4.76072 27.9578 5.08055 27.9928C5.40038 28.0277 5.72109 27.9349 5.97212 27.7348C6.22315 27.5346 6.38394 27.2435 6.41913 26.9254C6.68393 24.581 7.80797 22.4158 9.5765 20.8434C11.345 19.2711 13.6341 18.4019 16.0062 18.4019C18.3784 18.4019 20.6674 19.2711 22.436 20.8434C24.2045 22.4158 25.3285 24.581 25.5933 26.9254C25.6261 27.2201 25.7675 27.4922 25.9902 27.6894C26.2129 27.8865 26.5011 27.9946 26.7993 27.9928H26.9319C27.248 27.9566 27.537 27.7976 27.7357 27.5505C27.9345 27.3034 28.027 26.9882 27.9931 26.6735C27.7513 24.5102 26.9221 22.4531 25.5944 20.7228C24.2666 18.9925 22.4904 17.6541 20.4561 16.8512ZM15.9821 15.9997C15.0281 15.9997 14.0955 15.7183 13.3022 15.1912C12.509 14.6641 11.8907 13.9148 11.5256 13.0383C11.1605 12.1617 11.065 11.1971 11.2511 10.2665C11.4372 9.33598 11.8966 8.48119 12.5712 7.81029C13.2458 7.13938 14.1054 6.68249 15.0411 6.49739C15.9768 6.31228 16.9466 6.40728 17.8281 6.77038C18.7095 7.13347 19.4628 7.74834 19.9929 8.53724C20.5229 9.32614 20.8058 10.2536 20.8058 11.2024C20.8058 12.4747 20.2976 13.6949 19.393 14.5946C18.4884 15.4943 17.2614 15.9997 15.9821 15.9997Z"
        fill={props.fill}
      />
    </svg>
  );
};

const MenuActiveStateSVG = (props) => {
  return (
    <motion.svg
      width="44"
      height="41"
      viewBox="0 0 44 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="menu-global-indecator-normat-state"
      initial="init"
      animate={props.animate ? 'animate' : 'exit'}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 1 }}
      variants={{ animate: { rotate: 90 }, exit: { rotate: 0 } }}
      //   variants.fadeInSlideIn
    >
      <path
        d="M32.7214 29.836L13.2763 10.3907C12.7559 9.87025 11.912 9.8693 11.3907 10.3907C10.8693 10.912 10.8702 11.7559 11.3907 12.2763L30.8358 31.7216C31.3562 32.242 32.2 32.243 32.7214 31.7216C33.2428 31.2002 33.2418 30.3564 32.7214 29.836Z"
        fill={props.fill}
      />
      <path
        d="M13.2764 31.7215L32.7217 12.2764C33.2422 11.756 33.2431 10.9122 32.7217 10.3908C32.2004 9.86943 31.3565 9.87037 30.8361 10.3908L11.3908 29.8359C10.8704 30.3564 10.8694 31.2002 11.3908 31.7215C11.9122 32.2429 12.756 32.242 13.2764 31.7215Z"
        fill={props.fill}
      />
    </motion.svg>
  );
};

// --------------------------------------------------------

const CatelogSVG = ({ colorState }) => {
  return (
    <svg
      width="31"
      height="32"
      viewBox="0 0 31 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7.24999C0 6.55875 0.59404 6 1.32598 6L22.0441 6.00011C22.7761 6.00011 23.3701 6.55886 23.3701 7.25011C23.3701 7.94135 22.7761 8.5001 22.0441 8.5001L1.32598 8.49999C0.59404 8.49999 0 7.94124 0 7.24999ZM28.674 14.7501L1.32598 14.7499C0.59404 14.7499 0 15.3087 0 15.9999C0 16.6912 0.59404 17.2499 1.32598 17.2499L28.674 17.25C29.406 17.25 30 16.6913 30 16.0001C30 15.3088 29.406 14.7501 28.674 14.7501ZM16.7402 23.5L1.32598 23.4999C0.59404 23.4999 0 24.0586 0 24.7499C0 25.4411 0.59404 25.9999 1.32598 25.9999L16.7402 26C17.4721 26 18.0662 25.4413 18.0662 24.75C18.0662 24.0588 17.4721 23.5 16.7402 23.5Z"
        fill={colorState}
      />
    </svg>
  );
};
// --------------------------------------------------------

const HomePageIconSVG = ({ colorState }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6384 11.8128L13.2884 1.4682L12.5946 0.774454C12.4366 0.617427 12.2228 0.529297 12 0.529297C11.7772 0.529297 11.5634 0.617427 11.4053 0.774454L0.361593 11.8128C0.199622 11.9742 0.0716145 12.1663 -0.0148749 12.378C-0.101364 12.5896 -0.144583 12.8164 -0.141979 13.045C-0.131265 13.9878 0.653557 14.7405 1.59641 14.7405H2.73481V23.4646H21.2652V14.7405H22.4277C22.8857 14.7405 23.3169 14.5611 23.6411 14.237C23.8006 14.0779 23.9271 13.8887 24.0131 13.6804C24.0991 13.4722 24.1429 13.2489 24.1419 13.0236C24.1419 12.5682 23.9625 12.137 23.6384 11.8128ZM13.5 21.5361H10.5V16.0718H13.5V21.5361ZM19.3366 12.812V21.5361H15.2143V15.4289C15.2143 14.837 14.7348 14.3575 14.1428 14.3575H9.85713C9.26516 14.3575 8.7857 14.837 8.7857 15.4289V21.5361H4.66338V12.812H2.09195L12.0027 2.90928L12.6214 3.52802L21.9107 12.812H19.3366Z"
        fill={colorState}
      />
    </svg>
  );
};

export {
  MenueNormalStateSVG,
  LogoSVG,
  SearchSVG,
  WishlistSVG,
  BasketSVG,
  ProfileSVG,
  MenuActiveStateSVG,
  CatelogSVG,
  HomePageIconSVG,
};
