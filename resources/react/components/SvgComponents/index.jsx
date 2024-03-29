import React from 'react';

export const LogoDarkSVG = (props) => (
    <svg 
        width={478.231} 
        height={124.4} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="10.884 12.8 478.231 124.4" 
        style={{ background: "0 0" }} 
        preserveAspectRatio="xMidYMid" 
        {...props}
    >
        <defs>
            <filter id="editing-extrusion" x="-100%" y="-100%" width="300%" height="300%">
                <feFlood result="color1" floodColor="#ccc" />
                <feConvolveMatrix 
                    order="8,8" 
                    divisor={1}
                    kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
                    in="SourceAlpha" 
                    result="extrude" 
                />
                <feComposite in="color1" in2="extrude" result="comp-extrude" operator="in" />
                <feOffset dx={4} dy={4} in="comp-extrude" result="offset-extrude" />
                <feMerge>
                    <feMergeNode in="offset-extrude" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#editing-extrusion)">
            <path
                d="M138.22 84.595q0 2.68-1.02 5.01-1.02 2.33-2.75 4.07-1.73 1.73-4.08 2.73-2.34 1-4.97 1H95.06v-6.41h30.34q1.32 0 2.49-.5 1.17-.5 2.04-1.37.88-.88 1.38-2.05.5-1.17.5-2.48 0-1.32-.5-2.47-.5-1.16-1.38-2.03-.87-.88-2.04-1.38-1.17-.5-2.49-.5H95.06v-6.4H119q1.31 0 2.48-.5t2.05-1.38q.87-.87 1.37-2.05.5-1.17.5-2.48t-.5-2.48q-.5-1.18-1.37-2.05-.88-.88-2.05-1.38-1.17-.5-2.48-.5H91.87v38.41h-6.4v-44.81H119q2.62 0 4.97 1.01 2.34 1.02 4.07 2.75 1.74 1.74 2.75 4.08 1.02 2.34 1.02 4.97 0 2.03-.59 3.83-.6 1.79-1.6 3.33 1.88.65 3.45 1.84 1.58 1.19 2.72 2.75 1.14 1.56 1.78 3.45.65 1.89.65 3.99Zm48.18-4.85q0 3.66-1.15 6.86-1.16 3.21-3.3 5.61-2.14 2.41-5.13 3.8-2.98 1.39-6.64 1.39h-11.12q-3.66 0-6.66-1.39t-5.14-3.8q-2.14-2.4-3.29-5.61-1.16-3.2-1.16-6.86 0-3.62 1.16-6.81 1.15-3.19 3.29-5.58t5.14-3.76q3-1.38 6.66-1.38h11.12q3.66 0 6.64 1.38 2.99 1.37 5.13 3.76 2.14 2.39 3.3 5.58 1.15 3.19 1.15 6.81Zm-6.4 0q0-2.31-.68-4.36-.67-2.04-1.93-3.56-1.27-1.51-3.08-2.4-1.81-.9-4.13-.9h-11.12q-2.31 0-4.14.9-1.83.89-3.1 2.4-1.26 1.52-1.93 3.56-.67 2.05-.67 4.36 0 2.32.67 4.36.67 2.05 1.93 3.58 1.27 1.53 3.1 2.42 1.83.89 4.14.89h11.12q2.32 0 4.13-.89t3.08-2.42q1.26-1.53 1.93-3.58.68-2.04.68-4.36Zm54.97 0q0 3.66-1.16 6.86-1.16 3.21-3.3 5.61-2.14 2.41-5.12 3.8-2.99 1.39-6.64 1.39h-11.13q-3.65 0-6.65-1.39-3-1.39-5.15-3.8-2.14-2.4-3.29-5.61-1.16-3.2-1.16-6.86 0-3.62 1.16-6.81 1.15-3.19 3.29-5.58 2.15-2.39 5.15-3.76 3-1.38 6.65-1.38h11.13q3.65 0 6.64 1.38 2.98 1.37 5.12 3.76 2.14 2.39 3.3 5.58 1.16 3.19 1.16 6.81Zm-6.41 0q0-2.31-.67-4.36-.67-2.04-1.94-3.56-1.27-1.51-3.08-2.4-1.81-.9-4.12-.9h-11.13q-2.31 0-4.14.9-1.83.89-3.09 2.4-1.27 1.52-1.94 3.56-.67 2.05-.67 4.36 0 2.32.67 4.36.67 2.05 1.94 3.58 1.26 1.53 3.09 2.42 1.83.89 4.14.89h11.13q2.31 0 4.12-.89t3.08-2.42q1.27-1.53 1.94-3.58.67-2.04.67-4.36Zm52.06 7.28q0 2.16-.81 4.05-.81 1.89-2.2 3.3-1.39 1.4-3.29 2.22-1.89.81-4.04.81h-29.91v-6.41h29.91q.84 0 1.58-.29.73-.3 1.28-.85.54-.54.86-1.26.31-.72.31-1.57 0-.84-.31-1.57-.32-.74-.86-1.28-.55-.55-1.28-.86-.74-.32-1.58-.32h-19.6q-2.12 0-4-.81-1.87-.81-3.28-2.23-1.4-1.43-2.22-3.33-.81-1.91-.81-4.06 0-2.1.81-3.99.82-1.89 2.22-3.3 1.41-1.4 3.28-2.23 1.88-.83 4-.83h27.6v6.31h-27.6q-.81 0-1.54.33-.74.33-1.27.88-.53.54-.84 1.28-.31.73-.31 1.55 0 .84.31 1.57.31.74.84 1.29.53.54 1.27.85.73.32 1.54.32h19.6q2.15 0 4.04.83 1.9.82 3.29 2.25 1.39 1.42 2.2 3.32.81 1.91.81 4.03Zm26.13-18.5v28.88h-6.41v-28.88H283.4v-6.31h40.25v6.31h-16.9Zm58.93 22.41v6.47h-36.75v-35.31h36.75v6.43H335.4v22.41h30.28Zm-4.09-14.59v6.47h-23.16v-6.47h23.16Zm52.94 3.34q0 3.72-1.19 6.95-1.19 3.24-3.34 5.63-2.16 2.39-5.21 3.76-3.04 1.38-6.73 1.38h-15.72v-6.47h15.72q2.34 0 4.19-.87 1.84-.88 3.14-2.39 1.29-1.52 1.98-3.57.69-2.04.69-4.42 0-2.34-.69-4.37-.69-2.04-1.98-3.54-1.3-1.5-3.14-2.37-1.85-.88-4.19-.88h-18.75v28.88h-6.53v-35.31h25.28q3.69 0 6.73 1.37 3.05 1.38 5.21 3.75 2.15 2.38 3.34 5.58t1.19 6.89Z"
                fill="#082032" 
            />
        </g>
        <style />
    </svg>
);

export const LogoLightSVG = (props) => (
    <svg
        width={478.231}
        height={124.4}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="10.884 12.8 478.231 124.4"
        style={{ background: "0 0" }}
        preserveAspectRatio="xMidYMid"
        {...props}
    >
        <defs>
            <filter
                id="editing-extrusion"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
            >
                <feFlood result="color1" floodColor="#ccc" />
                <feConvolveMatrix
                    order="8,8"
                    divisor={1}
                    kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
                    in="SourceAlpha"
                    result="extrude"
                />
                <feComposite
                    in="color1"
                    in2="extrude"
                    result="comp-extrude"
                    operator="in"
                />
                <feOffset dx={4} dy={4} in="comp-extrude" result="offset-extrude" />
                <feMerge>
                    <feMergeNode in="offset-extrude" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#editing-extrusion)">
            <path
                d="M138.22 84.595q0 2.68-1.02 5.01-1.02 2.33-2.75 4.07-1.73 1.73-4.08 2.73-2.34 1-4.97 1H95.06v-6.41h30.34q1.32 0 2.49-.5 1.17-.5 2.04-1.37.88-.88 1.38-2.05.5-1.17.5-2.48 0-1.32-.5-2.47-.5-1.16-1.38-2.03-.87-.88-2.04-1.38-1.17-.5-2.49-.5H95.06v-6.4H119q1.31 0 2.48-.5t2.05-1.38q.87-.87 1.37-2.05.5-1.17.5-2.48t-.5-2.48q-.5-1.18-1.37-2.05-.88-.88-2.05-1.38-1.17-.5-2.48-.5H91.87v38.41h-6.4v-44.81H119q2.62 0 4.97 1.01 2.34 1.02 4.07 2.75 1.74 1.74 2.75 4.08 1.02 2.34 1.02 4.97 0 2.03-.59 3.83-.6 1.79-1.6 3.33 1.88.65 3.45 1.84 1.58 1.19 2.72 2.75 1.14 1.56 1.78 3.45.65 1.89.65 3.99Zm48.18-4.85q0 3.66-1.15 6.86-1.16 3.21-3.3 5.61-2.14 2.41-5.13 3.8-2.98 1.39-6.64 1.39h-11.12q-3.66 0-6.66-1.39t-5.14-3.8q-2.14-2.4-3.29-5.61-1.16-3.2-1.16-6.86 0-3.62 1.16-6.81 1.15-3.19 3.29-5.58t5.14-3.76q3-1.38 6.66-1.38h11.12q3.66 0 6.64 1.38 2.99 1.37 5.13 3.76 2.14 2.39 3.3 5.58 1.15 3.19 1.15 6.81Zm-6.4 0q0-2.31-.68-4.36-.67-2.04-1.93-3.56-1.27-1.51-3.08-2.4-1.81-.9-4.13-.9h-11.12q-2.31 0-4.14.9-1.83.89-3.1 2.4-1.26 1.52-1.93 3.56-.67 2.05-.67 4.36 0 2.32.67 4.36.67 2.05 1.93 3.58 1.27 1.53 3.1 2.42 1.83.89 4.14.89h11.12q2.32 0 4.13-.89t3.08-2.42q1.26-1.53 1.93-3.58.68-2.04.68-4.36Zm54.97 0q0 3.66-1.16 6.86-1.16 3.21-3.3 5.61-2.14 2.41-5.12 3.8-2.99 1.39-6.64 1.39h-11.13q-3.65 0-6.65-1.39-3-1.39-5.15-3.8-2.14-2.4-3.29-5.61-1.16-3.2-1.16-6.86 0-3.62 1.16-6.81 1.15-3.19 3.29-5.58 2.15-2.39 5.15-3.76 3-1.38 6.65-1.38h11.13q3.65 0 6.64 1.38 2.98 1.37 5.12 3.76 2.14 2.39 3.3 5.58 1.16 3.19 1.16 6.81Zm-6.41 0q0-2.31-.67-4.36-.67-2.04-1.94-3.56-1.27-1.51-3.08-2.4-1.81-.9-4.12-.9h-11.13q-2.31 0-4.14.9-1.83.89-3.09 2.4-1.27 1.52-1.94 3.56-.67 2.05-.67 4.36 0 2.32.67 4.36.67 2.05 1.94 3.58 1.26 1.53 3.09 2.42 1.83.89 4.14.89h11.13q2.31 0 4.12-.89t3.08-2.42q1.27-1.53 1.94-3.58.67-2.04.67-4.36Zm52.06 7.28q0 2.16-.81 4.05-.81 1.89-2.2 3.3-1.39 1.4-3.29 2.22-1.89.81-4.04.81h-29.91v-6.41h29.91q.84 0 1.58-.29.73-.3 1.28-.85.54-.54.86-1.26.31-.72.31-1.57 0-.84-.31-1.57-.32-.74-.86-1.28-.55-.55-1.28-.86-.74-.32-1.58-.32h-19.6q-2.12 0-4-.81-1.87-.81-3.28-2.23-1.4-1.43-2.22-3.33-.81-1.91-.81-4.06 0-2.1.81-3.99.82-1.89 2.22-3.3 1.41-1.4 3.28-2.23 1.88-.83 4-.83h27.6v6.31h-27.6q-.81 0-1.54.33-.74.33-1.27.88-.53.54-.84 1.28-.31.73-.31 1.55 0 .84.31 1.57.31.74.84 1.29.53.54 1.27.85.73.32 1.54.32h19.6q2.15 0 4.04.83 1.9.82 3.29 2.25 1.39 1.42 2.2 3.32.81 1.91.81 4.03Zm26.13-18.5v28.88h-6.41v-28.88H283.4v-6.31h40.25v6.31h-16.9Zm58.93 22.41v6.47h-36.75v-35.31h36.75v6.43H335.4v22.41h30.28Zm-4.09-14.59v6.47h-23.16v-6.47h23.16Zm52.94 3.34q0 3.72-1.19 6.95-1.19 3.24-3.34 5.63-2.16 2.39-5.21 3.76-3.04 1.38-6.73 1.38h-15.72v-6.47h15.72q2.34 0 4.19-.87 1.84-.88 3.14-2.39 1.29-1.52 1.98-3.57.69-2.04.69-4.42 0-2.34-.69-4.37-.69-2.04-1.98-3.54-1.3-1.5-3.14-2.37-1.85-.88-4.19-.88h-18.75v28.88h-6.53v-35.31h25.28q3.69 0 6.73 1.37 3.05 1.38 5.21 3.75 2.15 2.38 3.34 5.58t1.19 6.89Z"
                fill="#fff"
            />
        </g>
        <style />
    </svg>
);

export const EnglandFlagSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" {...props}>
        <path
            style={{
                strokeWidth: "1pt",
                fill: "#006",
            }}
            d="M0 0h60v30H0z"
            transform="scale(16.667)"
        />

        <path
            style={{
                strokeWidth: "1pt",
                fill: "#fff",
            }}
            d="M0 0v3.354L53.292 30H60v-3.354L6.708 0H0zm60 0v3.354L6.708 30H0v-3.354L53.292 0H60z"
            transform="scale(16.667)"
        />

        <path
            style={{
                strokeWidth: "1pt",
                fill: "#fff",
            }}
            d="M25 0v30h10V0H25zM0 10v10h60V10H0z"
            transform="scale(16.667)"
        />

        <path
            style={{
                strokeWidth: "1pt",
                fill: "#c00",
            }}
            d="M0 12v6h60v-6H0zM27 0v30h6V0h-6zM0 30l20-10h4.472l-20 10H0zM0 0l20 10h-4.472L0 2.236V0zm35.528 10 20-10H60L40 10h-4.472zM60 30 40 20h4.472L60 27.764V30z"
            transform="scale(16.667)"
        />
    </svg>
);

export const SpainFlagSVG = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 44.8" {...props}>
        <path
            style={{
                fill: "#c60b1e",
            }}
            d="M.354 33.943h70v11.2h-70z"
            transform="translate(-.354 -.343)"
        />
        <path
            style={{
                fill: "#ffc400",
            }}
            d="M.354 11.543h70v22.4h-70z"
            transform="translate(-.354 -.343)"
        />
        <path
            style={{
                fill: "#c60b1e",
            }}
            d="M.354.343h70v11.2h-70z"
            transform="translate(-.354 -.343)"
        />
    </svg>
);
