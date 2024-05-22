const FastSpeedtest = require("fast-speedtest-api");

const user = {};
user.speed = (req, res, next) => {
  //   speedtest = new FastSpeedtest({
  //     token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
  //     verbose: true, // default: false
  //     timeout: 10000, // default: 5000
  //     https: true, // default: true
  //     urlCount: 5, // default: 5
  //     bufferSize: 8, // default: 8
  //     unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  //   });

  //   speedtest
  //     .getSpeed()
  //     .then((s) => {
  //       const overallSpeed = s;
  //     //   const uploadSpeed = s.upload;
  //     //   const downloadSpeed = s.download;
  //       console.log(`Overall Speed: ${s} Mbps`);
  //       res.locals.test = s;
  //       next();
  //     })
  //     .catch((e) => {
  //       console.error(e.message);
  //       return next(e)
  //     });

//   async function runSpeedTest() {
//     try {
//       const response = await fetch('https://api.fast.com/netflix/speedtest', {
//         headers: {
//           "Fastly-Key": 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm',
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to initiate speed test");
//       }
//       const data = await response.json();
//       res.locals.test = data;
//       console.log("Speed test results:", data);
//       // Process the results and display them to the user
//       // Example: const downloadSpeed = data.download;
//       // Example: const uploadSpeed = data.upload;
//     } catch (error) {
//       console.error("Error initiating speed test:", error);
//     }
//   } byeeeeeeeeeeeeee
};

module.exports = user;
