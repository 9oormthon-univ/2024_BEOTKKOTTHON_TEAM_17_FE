const PlusInfoBtn = ({ onClick }) => {
  return (
    <div style={{ marginTop: "54px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="65"
        height="65"
        viewBox="0 0 65 65"
        fill="none"
        onClick={onClick}
      >
        <path
          d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
          fill="url(#paint0_linear_661_7573)"
        />
        <path
          d="M33 20V46"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M46 33L20 33"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_661_7573"
            x1="32"
            y1="-31"
            x2="32"
            y2="82"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0.0475677"
              stop-color="#92CBFF"
            />
            <stop
              offset="0.462568"
              stop-color="#0587FF"
            />
            <stop
              offset="0.752212"
              stop-color="#0076FF"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default PlusInfoBtn;
