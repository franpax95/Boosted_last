import React from 'react';
import { StyledHeader } from './style';
import { GradientBackground, ImageBackground } from '../Background';

export const CollectionPageHeader = ({ title = '', body = '', footer = '', lightIMG, darkIMG, reverse = false }) => (
    <StyledHeader className={`collection-header ${reverse ? 'reverse' : ''}`}>
        <GradientBackground
            className="main-bg"
            dark="linear-gradient(60deg, #2C394B 0%, #082032 100%)"
            light="linear-gradient(to top, #F9F6F7 0%, #F0F0F0 100%)"
        />

        <div className="info">
            <h1 className="info-title">{title}</h1>

            <p className="info-body">{body}</p>

            <p className="info-footer">{footer}</p>
        </div>

        <div className="backgrounds">
            <GradientBackground
                className="bg1"
                dark="linear-gradient(0deg, rgba(127,186,18,0.33) 0%, rgba(127,186,18,1) 100%)"
                light="linear-gradient(0deg, rgba(58,93,223,0.33) 0%, rgba(58,93,223,1) 100%)"
            />

            <ImageBackground 
                className="bg2"
                objectFit="contain"
                light={lightIMG}
                dark={darkIMG}
            />

            <GradientBackground
                className="bg3"
                dark="linear-gradient(0deg, rgba(127,186,18,1) 0%, rgba(127,186,18,0.33) 100%)"
                light="linear-gradient(0deg, rgba(58,93,223,1) 0%, rgba(58,93,223,0.33) 100%)"
            />
        </div>
    </StyledHeader>
);

export const DetailsPageHeader = ({ title = '', body = '', footer = '', lightIMG, darkIMG, reverse = false }) => (
    <StyledHeader className={`details-header ${reverse ? 'reverse' : ''}`}>
        <GradientBackground
            className="main-bg"
            dark="linear-gradient(60deg, #2C394B 0%, #082032 100%)"
            light="linear-gradient(to top, #F9F6F7 0%, #F0F0F0 100%)"
        />

        <div className="info">
            <h1 className="info-title">{title}</h1>

            <p className="info-body">{body}</p>

            <p className="info-footer">{footer}</p>
        </div>

        <div className="backgrounds">
            <GradientBackground
                className="bg1"
                dark="linear-gradient(0deg, rgba(127,186,18,0.33) 0%, rgba(127,186,18,1) 100%)"
                light="linear-gradient(0deg, rgba(58,93,223,0.33) 0%, rgba(58,93,223,1) 100%)"
            />

            <ImageBackground 
                className="bg2"
                objectFit="contain"
                light={lightIMG}
                dark={darkIMG}
            />

            <GradientBackground
                className="bg3"
                dark="linear-gradient(0deg, rgba(127,186,18,1) 0%, rgba(127,186,18,0.33) 100%)"
                light="linear-gradient(0deg, rgba(58,93,223,1) 0%, rgba(58,93,223,0.33) 100%)"
            />
        </div>
    </StyledHeader>
);

export const AddFormPageHeader = ({ title = '', body = '', footer = '', lightIMG, darkIMG, reverse = false }) => (
    <StyledHeader className={`add-form-header ${reverse ? 'reverse' : ''}`}>
        <GradientBackground
            className="main-bg"
            dark="linear-gradient(60deg, #2C394B 0%, #082032 100%)"
            light="linear-gradient(to top, #F9F6F7 0%, #F0F0F0 100%)"
        />

        <div className="info">
            <h1 className="info-title">{title}</h1>

            <p className="info-body">{body}</p>

            <p className="info-footer">{footer}</p>
        </div>

        <div className="backgrounds">
            {/* <GradientBackground
                className="bg1"
                dark="linear-gradient(0deg, rgba(127,186,18,0.33) 0%, rgba(127,186,18,1) 100%)"
                light="linear-gradient(0deg, rgba(58,93,223,0.33) 0%, rgba(58,93,223,1) 100%)"
            />

            <ImageBackground 
                className="bg2"
                objectFit="contain"
                light={lightIMG}
                dark={darkIMG}
            />

            <GradientBackground
                className="bg3"
                dark="linear-gradient(0deg, rgba(127,186,18,1) 0%, rgba(127,186,18,0.33) 100%)"
                light="linear-gradient(0deg, rgba(58,93,223,1) 0%, rgba(58,93,223,0.33) 100%)"
            /> */}
        </div>
    </StyledHeader>
);
