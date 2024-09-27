import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Make sure to install this package: npm install qrcode.react
import buttonColors from './buttonColors';
import './ShareGrid.css';


const ShareGrid = () => {
    const [customMessage, setCustomMessage] = useState("Share this awesome page!");
    const [pageUrl] = useState(() => window.location.href);
    const [activeShareOption, setActiveShareOption] = useState(null);
    const [expirationTime, setExpirationTime] = useState('1h');
    const [selfDestructLink, setSelfDestructLink] = useState('');
    const [maxViews, setMaxViews] = useState(1);
    const [maxViewTime, setMaxViewTime] = useState(0);
    const [linkExpiration, setLinkExpiration] = useState(0);
    const [description, setDescription] = useState('');


    const createShareOption = (name, icon, buttonText, popupMessage) => ({
        name,
        icon,
        buttonText,
        popupMessage
    });


    const generateSelfDestructLink = () => {
        const baseUrl = 'http://localhost:3000';
        const encodedPageUrl = encodeURIComponent(pageUrl);
        const encodedMessage = encodeURIComponent(customMessage || 'Check out this link!');
        const encodedDescription = encodeURIComponent(description);
        const newLink = `${baseUrl}/?url=${encodedPageUrl}&message=${encodedMessage}&expire=${expirationTime}&maxViews=${maxViews}&maxViewTime=${maxViewTime}&linkExpiration=${linkExpiration}&description=${encodedDescription}`;
        setSelfDestructLink(newLink);
    };

    const createPlatformUrls = (url, message) => ({
        // Social media platforms
        'Facebook': `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        'Twitter': `https://twitter.com/intent/tweet?text=${message}&url=${url}`,
        'Instagram': 'https://www.instagram.com/',
        'LinkedIn': `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        'Pinterest': `https://pinterest.com/pin/create/button/?url=${url}&description=${message}`,
        'YouTube': 'https://www.youtube.com/upload',
        'TikTok': 'https://www.tiktok.com/upload/',
        'Reddit': `https://reddit.com/submit?url=${url}&title=${message}`,
        'Tumblr': `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${message}&caption=${message}&content=${url}&canonicalUrl=${url}&shareSource=tumblr_share_button`,
        'Snapchat': 'https://www.snapchat.com',

        // Messaging platforms
        'WhatsApp': `https://wa.me/?text=${message} ${url}`,

        // Unique sharing methods
        'Clouds': 'https://www.airsign.com',
        'Space': 'https://www.sentintospace.com',
        'Robotic Letter': 'https://roboquill.io',
        'Pen Pal': 'https://www.penpalworld.com',
        'Carrier Pigeon': 'https://www.pigeongram.com',
        'Telemarketers': 'https://jollyrogertelephone.com',
        'President': 'https://www.whitehouse.gov/contact/',
        'Human Hair': 'http://www.technovelgy.com/ct/Science-Fiction-News.asp?NewsNum=1564',
        'Explorers': 'https://www.geocaching.com/play',
        'Prisoners': 'https://writeaprisoner.com',
        'Drones': 'https://skyelementsdrones.com',
        'Twitch Donation': 'https://www.twitch.tv',
        'Breaking News': 'https://breakyourownnews.com',
        'Local Newspapers': 'https://www.usnpl.com',
        'Neighbors': 'https://nextdoor.com',
        'Santa': 'https://santasclub.com',
        'Future Self': 'https://www.futureme.org',
        'Void': 'https://screamintothevoid.com',
        "Dead Man's Switch": 'https://www.deadmansswitch.net',
        "Celeb Shoutout": 'https://www.cameo.com/',
        "Maze": 'https://www.mazegenerator.net',
        "Message in a Bottle": 'https://www.bottledapp.com',
        "Fortune Cookie": 'https://fortunecookiegenerator.com/custom-fortune-cookie',
        "Rubik's Mosaic": 'https://ruwix.com/rubiks-cube-mosaic-generator/',

        // Content creation and conversion
        'Convert': 'https://convertio.co/',
        'Fake Text': 'https://ifaketextmessage.com',
        'GIF': 'https://giphy.com/create/gifmaker',
        'Emoji': 'https://emoji.fly.dev',

        // Link-related options
        'QR Code': 'https://www.qrcode-monkey.com/',
        'Self-Destruct Link': `https://thislinkwillselfdestruct.com/?url=${url}&message=${message}`,
        'Secret Note': `https://privnote.com/#${message}%0A%0A${url}`,

        // AI and language
        'ChatGPT': 'https://chat.openai.com',
        'Languages': `https://www.deepl.com/en/translator#en/auto/${message}`,

        // Physical advertising methods
        '3D-AR Display': 'https://aryel.io',
        'Projection': 'https://grassrootsadvertising.com/what-we-do/projection-advertising/',
        'Backpack Billboards': 'https://grassrootsadvertising.com/what-we-do/backpack-billboards-advertising/',
        'Times Square': 'https://www.timessquarenyc.org/do-business/promote-partner/advertising-sponsorships/digital-screens-billboards',
        'Chalk Art': 'https://grassrootsadvertising.com/what-we-do/chalk-art/',
        'Wall Drawing': 'https://scribit.design',
        'Cling Alls': 'https://grassrootsadvertising.com/what-we-do/cling-alls/',
        'Street Washing': 'https://grassrootsadvertising.com/what-we-do/street-washing/',
        'Ice Embossing': 'https://www.yankodesign.com/2023/01/02/this-ice-embosser-lets-you-completely-upgrade-your-cocktail-game-with-custom-branded-ice-cubes/',
        'Custom Cereal Box': 'https://www.mrbreakfast.com/box1.asp',
        'GPS Doodle': 'https://gpsdoodles.com',
        'Branded Fruit': 'https://brandedfruit.com/',
        'Vehicle Emoji': 'http://www.technovelgy.com/ct/Science-Fiction-News.asp?NewsNum=5660'
    });

    // Main function to handle sharing content
    const shareContent = (platform) => {
        const url = encodeURIComponent(pageUrl);
        const message = encodeURIComponent(customMessage);

        // Create the platform URLs
        const platformUrls = createPlatformUrls(url, message);

        if (platformUrls[platform]) {
            window.open(platformUrls[platform], '_blank');
        } else {
            // Handle special cases
            switch (platform) {
                case 'Link':
                    navigator.clipboard.writeText(pageUrl);
                    break;
                case 'Email':
                    window.location.href = `mailto:?subject=${encodeURIComponent("Check out this page!")}&body=${message}%0A%0A${url}`;
                    break;
                case 'Text Message':
                    window.location.href = `sms:?body=${message} ${url}`;
                    break;
                default:
                    console.log(`Sharing on ${platform} not implemented yet`);
            }
        }
    };

    // Array of share options
    const shareOptions = [
        // Social media platforms
        createShareOption('Facebook', '📘', 'Facebook Share', 'Ready to make your friends scroll with envy?'),
        createShareOption('Twitter', '🐦', 'Twitter Share', 'Share this page to the Twitterverse.'),
        createShareOption('Instagram', '📷', 'Instagram Share', 'Share this page on the Gram.'),
        createShareOption('LinkedIn', '💼', 'LinkedIn Share', 'Impress your connections with this career-boosting gem.'),
        createShareOption('Pinterest', '📌', 'Pinterest Share', 'Add this to your vision board of dreams.'),
        createShareOption('YouTube', '▶️', 'Upload Video', 'Make this page go viral in video form.'),
        createShareOption('TikTok', '🎵', 'Tiktok Share', 'Post this page to Tiktok.'),
        createShareOption('Reddit', '🤖', 'Reddit Share', 'Spark a heated debate in your favorite subreddit.'),
        createShareOption('Tumblr', 'T', 'Tumblr Share', 'Reblog this page into the Tumblr oblivion.'),
        createShareOption('Snapchat', '👻', 'Snap it', 'Make this page disappear into the abyss.'),

        // Messaging platforms
        createShareOption('WhatsApp', '💬', 'WhatsApp Share', 'Blast this page to all your group chats simultaneously.'),
        createShareOption('Text Message', '📱', 'Send Text', 'Interrupt someones day with this earth-shattering page.'),
        createShareOption('Email', '📧', 'Send Email', 'Clog up inboxes worldwide with this must-share page.'),

        // Unique sharing methods
        createShareOption('Clouds', '☁️', 'Skywrite It', 'Skywrite this page for alien civilizations to ponder.'),
        createShareOption('Space', '🚀', 'Launch It', 'Catapult this page into the stars.'),
        createShareOption('Robotic Letter', '🤖', 'Write It', 'Send a letter written by a robot to someone.'),
        createShareOption('Pen Pal', '✉️', 'Send It', 'Mail the share page to your long-lost childhood pen pal.'),
        createShareOption('Carrier Pigeon', '🐦', 'Send It', 'Entrust this page to a bird with navigation skills.'),
        createShareOption('Telemarketers', '📞', 'Share It', 'Share this page with telemarketers.'),
        createShareOption('President', '🏛️', 'Send It', 'Make the share page known by the most powerful person in the world.'),
        createShareOption('Human Hair', '💇', 'Encode It', 'Weave the url into the worlds most bizarre toupee.'),
        createShareOption('Explorers', '🧭', 'Hide It', 'Dispatch a team to carve this page on a newly discovered island.'),
        createShareOption('Prisoners', '🔒', 'Share It', 'Share this page with prisoners.'),
        createShareOption('Drones', '🚁', 'Deploy It', 'Create a drone swarm to spell out the share page in the night sky.'),
        createShareOption('Twitch Donation', '💜', 'Donate It', 'Drop donations to other streamers sharing the share page.'),
        createShareOption('Breaking News', '📰', 'Share News', 'Share the biggest breaking news by telling others about the share page.'),
        createShareOption('Neighbors', '🏘️', 'Share It', 'Tell your nosy neighbor about this page.'),
        createShareOption('Santa', '🎅', 'Tell Santa', 'Ask Santa you want this page for christmas.'),
        createShareOption('Future Self', '🔮', 'Send It', 'Suprise your self by sending this page to yourself in the future.'),
        createShareOption('Void', '🕳️', 'Scream It', 'Scream this page into the abyss and hope it doesnt yell back.'),
        createShareOption("Dead Man's Switch", '⏰', 'Share It', 'Share this page to others even after your gone.'),
        createShareOption("Celeb Shoutout", '🎬', 'Cameo Share', 'Get an actor to shoutout this awesome page.'),


        createShareOption('Maze', '🌿', 'Design It', 'Create a hedge maze in the shape of the URL.'),
        createShareOption("Message in a Bottle", '🍾', 'Launch a Bottle', 'Share this page with a stranger across the digital sea!'),
        createShareOption("Fortune Cookie", '🥠', 'Share Fortune', 'Create and share a custom fortune about this page!'),
        createShareOption("Rubiks Mosaic", '🧩', 'Cube It', 'Turn this page into a Rubiks Cube mosaic masterpiece!'),



        // Content creation and conversion
        createShareOption('Convert', '🔄', 'Convert It', 'Convert this page into different formats.'),
        createShareOption('Fake Text', '💬', 'Text It', 'Create a fake conversation dicussing this page.'),
        createShareOption('GIF', '🎞️', 'Create It', 'Immortalize the share page in a looping GIF.'),
        createShareOption('Emoji', '😀', 'Create It', 'Translate this page into an ancient language of emojis.'),

        // Link-related options
        createShareOption('Link', '🔗', 'Copy It', 'Copy a link  and share it with anyone on the internet.'),
        createShareOption('QR Code', '📱', 'Generate It', 'Encode this page into a maze-like pattern for robots to enjoy.'),
        createShareOption('Self-Destruct Link', '💥', 'Share It', ' Share this page in a self-destruct in 5... 4... 3....'),
        createShareOption('Secret Note', '🔒', 'Share It', 'Share this page as a cryptic message.'),

        // AI and language
        createShareOption('ChatGPT', '🤖', 'Message Ai', 'Let AI ponder the deep meaning of this page.'),
        createShareOption('Languages', '🌐', 'deepl Share', 'Use deepl to share this page with others in overal 6,500 languages.'),

        // Physical advertising methods
        createShareOption('3D-AR Display', '🕶️', 'Share It', 'Make this page float in mid-air like a holographic fever dream.'),
        createShareOption('Projection', '📽️', 'Project It', 'Broadcast this page onto the moon for all to see.'),
        createShareOption('Backpack Billboards', '🎒', 'Advertise It', 'Turn students into walking advertisements for this page.'),
        createShareOption('Times Square', '🗽', 'Display It', 'Blind tourists with this dazzling Times Square spectacle.'),
        createShareOption('Chalk Art', '🖍️', 'Draw It', 'Create sidewalk art thatll wash away with the first rain.'),
        createShareOption('Wall Drawing', '🖼️', 'Design It', 'Commission a story mural of this page.'),
        createShareOption('Cling Alls', '🔲', 'Stick It', 'Stick your message where it doesnt belong.'),
        createShareOption('Street Washing', '🧼', 'Clean It', 'Power-wash this page into grimy city streets.'),
        createShareOption('Ice Embossing', '🧊', 'Emboss It', 'Carve this page into a glacier for future archaeologists.'),
        createShareOption('Custom Cereal Box', '🥣', 'Design It', 'Design a custom cereal box with this page on it.'),
        createShareOption('GPS Doodle', '🗺️', 'Draw It', 'Draw this page as a GPS doodle.'),
        createShareOption('Branded Fruit', '🍎', 'Brand It', 'Advertise this page on fruit.'),
        createShareOption('Vehicle Emoji', '🚗', 'Display It', 'Display this page as an emoji on a vehicle.')
    ];



    // Function to handle share button click
    const handleShare = (index) => {
        // Set the active share option to the clicked index
        setActiveShareOption(index);
    };

    // Function to close the share popup
    const closePopup = () => {
        // Reset the active share option to null, effectively closing the popup
        setActiveShareOption(null);
    };

    return (
        <div className="share-container">

            {/* Input field for custom message */}
            <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter your custom message"
                className="custom-message-input"
            />

            {/* Grid container for share options */}
            <div className="share-grid">
                {shareOptions.map((option, index) => (
                    <div
                        key={index}
                        className="share-item"
                        data-name={option.name}
                        onClick={() => handleShare(index)}
                    >

                        {/* Display the icon for each share option */}
                        <div className="share-icon">{option.icon}</div>


                        {/* Display the name of each share option */}
                        <div className="share-name">
                            {`Share with ${option.name}`}
                        </div>
                    </div>
                ))}
            </div>

            {/* Conditional rendering: Only show the popup if activeShareOption is not null */}
            {activeShareOption !== null && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup} aria-label="Close" >
                            ✕
                        </button>

                        <h2>
                            {/* Display the icon for the active share option */}
                            <span className="popup-icon">{shareOptions[activeShareOption]?.icon}</span>

                            {/* Display the name of the active share option */}
                            {shareOptions[activeShareOption]?.name}
                        </h2>

                        {/* Existing options and new Self-Destruct Link option */}
                        {(shareOptions[activeShareOption]?.name === "QR Code" && (
                            <div className="qr-code-container">
                                <QRCode value={pageUrl} size={200} />
                            </div>

                        )) || (shareOptions[activeShareOption]?.name === "Link" && (
                            <div className="url-copy-container">
                                <input
                                    type="text"
                                    value={pageUrl}
                                    readOnly
                                    className="url-input"
                                />
                            </div>
                        )) || (shareOptions[activeShareOption]?.name === "Self-Destruct Link" && (
                            <div className="self-destruct-link-container">
                                <input
                                    type="text"
                                    value={selfDestructLink}
                                    readOnly
                                    className="url-input"
                                />
                                <div>
                                    <label>Max link views (required):</label>
                                    <input
                                        type="number"
                                        value={maxViews}
                                        onChange={(e) => setMaxViews(e.target.value)}
                                        className="max-views-input"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Max view time (optional):</label>
                                    <input
                                        type="number"
                                        value={maxViewTime}
                                        onChange={(e) => setMaxViewTime(e.target.value)}
                                        className="max-view-time-input"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label>Link expiration (optional):</label>
                                    <input
                                        type="number"
                                        value={linkExpiration}
                                        onChange={(e) => setLinkExpiration(e.target.value)}
                                        className="link-expiration-input"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label>Description (optional):</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="description-input"
                                    />
                                </div>
                                <div>
                                    <label>Expiration Time:</label>
                                    <select
                                        value={expirationTime}
                                        onChange={(e) => setExpirationTime(e.target.value)}
                                        className="expiration-select"
                                    >
                                        <option value="5m">5 minutes</option>
                                        <option value="1h">1 hour</option>
                                        <option value="1d">1 day</option>
                                        <option value="1w">1 week</option>
                                    </select>
                                </div>
                                <button onClick={generateSelfDestructLink} className="generate-button">
                                    Generate Link
                                </button>
                            </div>
                        ))}


                        {/* Display the popup message for the active share option */}
                        <p>{shareOptions[activeShareOption]?.popupMessage}</p>

                        {/* Container for action buttons */}
                        <div className="popup-buttons">
                            {/* Share button */}
                            <button
                                onClick={() => shareContent(shareOptions[activeShareOption]?.name)}
                                style={{
                                    // Dynamic styling based on the active share option
                                    '--button-color': buttonColors[shareOptions[activeShareOption]?.name] || '#ffffff',
                                    '--button-text-color': buttonColors[shareOptions[activeShareOption]?.name] ? '#ffffff' : '#000000'
                                }}
                            >
                                {/* Display custom button text or default to 'Yes, Share' */}
                                {shareOptions[activeShareOption]?.buttonText || 'Yes, Share'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareGrid;