module.exports = {
  apps : [{
    name: "VCH",
    script: "dist/app.js",
    env: {
      NODE_ENV: "development",
      port: "3000",
      host: "http://localhost:3000/",
      db : "mongodb://localhost:27017/AppChat",
      JWT_TOKEN_SECRET: "vch@11111111iiiiiiiii",
      AWS_BUCKET_NAME : "appchatbucket",
      AWS_ACCESS_KEYID: "AKIA5MSNVFQ2FCAZV62I",
      AWS_ACCESS_SECRET: "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",
      AWS_REGION: "us-east-2",
    },
    env_production: {
      NODE_ENV: "production",
      port: "5000"
    },
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'combined.log',
    time: true
  }]
};
