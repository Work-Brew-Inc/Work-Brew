const FastSpeedtest = require("fast-speedtest-api");
const supabase = require("../Models/model");

const user = {};

user.authCallback = async (req, res, next) => {
  console.log('authCallback');
  const code = req.query.code;

  try {
    if (code) {
      const supabase = createClient({ req, res });
      await supabase.auth.exchangeCodeForSession(code);
      
      // Authentication succeeded, navigate to the desired location
      res.send('Authentication successful'); // Or any other response
    } else {
      // Handle the case when code is not provided
      res.status(400).send('Code not provided');
    }
  } catch (error) {
    console.error('Error exchanging code for session:', error.message);
    res.status(500).send('Authentication failed');
  }
};
user.NewCustomer = async (req, res) => {
  const { id, email, name, home_location, age, handicap } = req.body;

  try {
      const { data, error } = await supabase 
          .from('users')
          .insert([
              { id, email, name, home_location, age, handicap }
          ]);

      if (error) {
          throw error;
      }

      res.status(200).json({ message: 'User added successfully', data });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

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
