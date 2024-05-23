const FastSpeedtest = require("fast-speedtest-api");

const user = {};
user.speed = async (req, res, next) => {
  speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
  });

try {
  const speed = await speedtest.getSpeed();
  console.log(`Overall Speed: ${speed} Mbps`);
  let roundedSpeed = Math.floor(speed);
  console.log(`Rounded Down Speed: ${roundedSpeed} Mbps`);

  let speedCategory;
  if (!roundedSpeed) speedCategory = 'No Wifi';
  else if (roundedSpeed < 30) speedCategory = 'Slow';
  else if (roundedSpeed >= 30 && roundedSpeed < 100) speedCategory = 'Moderate';
  else if (roundedSpeed >= 100) speedCategory = 'Fast';

  res.locals.test = speedCategory;
  next();
} catch (error) {
    console.error('Speed test failed:', error.message);

    //error handling based on ApiError codes
    let errorMessage = 'Error in Speed Test';
    if (error instanceof ApiError) {
      switch (error.code) {
        case 'BAD_TOKEN':
          errorMessage = 'Invalid API token';
          break;
        case 'UNREACHABLE_HTTPS_API':
        case 'UNREACHABLE_HTTP_API':
          errorMessage = 'No Internet Connection';
          break;
        case 'PROXY_NOT_AUTHENTICATED':
          errorMessage = 'Failed to authenticate with proxy';
          break;
        case 'UNKNOWN':
        default:
          errorMessage = 'Unknown error occurred';
          break;
      }
    } else {
      errorMessage = error.message.includes('network') || error.message.includes('timeout') 
        ? 'No Internet Connection' 
        : 'Error in Speed Test';
    }

    res.locals.test = errorMessage;
    next();
  }
};

module.exports = user;
