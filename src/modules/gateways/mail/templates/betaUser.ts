const betaUser = () => {
  const sender = `support@defimap.app`
  const text = 'DefiMap'
  const subject = 'DefiMap'
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- <script src="https://cdn.tailwindcss.com"></script> -->
      <style>
        .body {
          font-family: sans-serif !important;
        }
      </style>
    </head>
    <body class="body">
      <div>
        <img src="https://defimap.app/images/banner-email.png" alt="banner-defimap" height="300" />
      </div>
      <h3>All aboard explorers,</h3>
      <div>
        We are thrilled to inform you that you are now on the waitlist to get priority access to the upcoming features
        from DefiMap.
      </div>
      <div>
        We are working extremely hard to bring the best Defi Strategies to you as soon as possible. Please stay tuned for
        more updates in the upcoming future.
      </div>
      <br />
      <div>
        As a thank you for our early users who are waitlisted, you will be able to claim
        <strong>Pioneer Member</strong> pass in the future.
      </div>
      <br />
      <strong>Pioneer Member Pass benefits are:</strong>
      <div>
        <li>Early access to all new DefiMap features</li>
        <li>3 Months free for all paid features</li>
        <li>Pioneer member pass NFT</li>
        <li>50% off for 12 months on all paid features</li>
        <li>Priority support channel</li>
        <li>Much more benefits in the future</li>
      </div>
      <br />
  
      <div>To claim Pioneer Member Pass please keep an eye on our twitter or email.</div>
      <div>
        At DefiMap we aim to help users find the best strategies for their portfolio. Follow our product updates, news or
        give us suggestions via the channel listed below.
      </div>
      <br />
  
      <div>
        <div>
          Twitter:
          <a href="https://twitter.com/DeFi_Map" target="_blank" rel="noopener noreferrer">
            https://twitter.com/DeFi_Map
          </a>
        </div>
        <div>
          Telegram:
          <a href="http://t.me/defimap" target="_blank" rel="noopener noreferrer"> http://t.me/defimap </a>
        </div>
      </div>
      <br />
  
      <div>
        <div>Godspeed explorers,</div>
        <div>Defimap Team</div>
      </div>
      <br />
      <br />
  
      <div>
        <i>This is an automated message, please do not reply.</i>
        <div>© 2023 Defimap.app, All Rights Rerserved.</div>
      </div>
    </body>
  </html>
  `

  return { text, html, subject, sender }
}

export default betaUser
