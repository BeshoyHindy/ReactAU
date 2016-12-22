// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const details = {
  "id": "413dh-j",
  "images": [
    "/img/products/413dh-j-1.png"
  ],
  "docs": [
      {"desc": "spec.pdf", "size": 32, "filetype": "pdf", "src":"/docs/spec.pdf"}
  ],
  "name": "413DH-J (4ch 960H)",
  "brand": "iCATCH",
  "description": ["960H 4ch H.264 Compression & Web Transmission",
                  "High quality resolution at 960H Recording",
                  "iPhone,iPad,Android Search,Playback & Backup",
                  "Easy file backup with USB & Network (LAN)",
                  "Built-in 1x HDMI, 1x VGA, 2 x BNC (main/spot)",
                  "Easy P2P remote view available ( Key-optional)",
                  "Mouse Operation and IR remote control included",
                  "2 Years Warranty"
                  ],
  "spec": [
    { "name": "General",
      "members": [
        { "name": "Model", "details": "413DH-J"},
        { "name": "Brand", "details": "iCATCH"},
        { "name": "Consumption", "details": "<15W"},
        { "name": "Working Temperature", "details": "-10ºC~ +50ºC"},
        { "name": "Working Humidity", "details": "10% ~ 90%"},
        { "name": "Chassis", "details": "1U Chassis"},
        { "name": "Dimension mm(WxDxH)", "details": "280x203x51"},
        { "name": "Weight(without HDD)", "details": "<1.5 Kg"},
        { "name": "HDD", "details": "1000GB"}
      ]
    },
    { "name": "Video",
      "members": [
        { "name": "Video Input", "details": "4 Channel"},
        { "name": "IP Video Input", "details": "No"},
        { "name": "Compression", "details": "H.264"}
      ]
    },
    { "name": "Audio",
      "members": [
        { "name": "Audio Input", "details": "4x RCA (2.0 Vp-p, 1kΩ)"},
        { "name": "Audio Output", "details": "2x RCA (2.0 Vp-p, 1kΩ)"}
      ]
    },
    { "name": "Display",
      "members": [
        { "name": "VGA Output", "details": "1-ch, Resolution: 1920x1080P/60Hz, 1600x1200P/60Hz, 1280x1024P/60Hz, 1280x720P/60Hz, 1024x768P/60Hz"},
        { "name": "BNC Output", "details": "1-ch, BNC (1.0Vp-p,75Ohm) Resolution: 704x576"},
        { "name": "HDMI Output", "details": "1-ch, Resolution: 1920x1080P/60Hz, 1600x1200P/60Hz, 1280x1024P/60Hz, 1280x720P/60Hz, 1024x768P/60Hz"}
      ]
    },
    { "name": "Recording",
      "members": [
        { "name": "Resolution", "details": "960H/D1/HD1/CIF"},
        { "name": "Frame Rate", "details": "960H@100fps"}
      ]
    },
    { "name": "Playback",
      "members": [
        { "name": "Playback Resolution", "details": "960H/D1/CIF"},
        { "name": "Synchronous Playback", "details": "4ch"}
      ]
    },
    { "name": "Streaming",
      "members": [
        { "name": "Dual Stream", "details": "Support"},
        { "name": "Stream Type", "details": "Video, Video & Audio"}
      ]
    },
    { "name": "Hard Disk",
      "members": [
        { "name": "SATA Interface", "details": "1x SATA interface for 1 HDD"},
        { "name": "eSATA Interface", "details": "No"},
        { "name": "Capacity", "details": "Up to 6TB for each disk"}
      ]
    },
    { "name": "External Interface",
      "members": [
        { "name": "Network Interface", "details": "1 RJ-45 10/100 Mbps self-adaptive Ethernet Interface"},
        { "name": "Serial Interface", "details": "1 RS485 half-duplex interface"},
        { "name": "Sensor In (NO,NC)", "details": "4"},
        { "name": "Relay Out", "details": "1"},
        { "name": "USB", "details": "USB2.0 x 2"}
      ]
    },
    { "name": "Software",
      "members": [
        { "name": "PC", "details": "IE Browser, iWatch DVR, iCMS"},
        { "name": "Mobile App", "details": "iWatch DVR2"},
        { "name": "Tablet App", "details": "iWatch DVR2"}
      ]
    }
  ]
};

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (detail) => {
  return detail.firstName.toLowerCase() + '-' + detail.lastName.toLowerCase();
};

class DetailApi {
  static getAllDetails() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, details));
      }, 100);
    });
  }

}

export default DetailApi;
