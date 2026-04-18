export const welcomeEmailTemplate = (name: string = "") => `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selamat Bergabung di Nomenklatur</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            background-color: #f9f9fb;
            font-family: 'Inter', Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            -webkit-font-smoothing: antialiased;
        }
        
        table {
            border-collapse: collapse;
        }
        
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header-section {
            padding: 60px 40px;
        }
        
        .hero-table {
            width: 100%;
        }
        
        .hero-text-col {
            width: 55%;
            padding-right: 20px;
        }
        
        .hero-img-col {
            width: 45%;
            vertical-align: middle;
        }
        
        .title {
            font-family: 'Playfair Display', serif;
            font-size: 44px;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: #111827;
        }
        
        .title .accent {
            color: #9a7d45;
            font-style: italic;
        }
        
        .description {
            font-size: 15px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 32px;
        }
        
        .button {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            text-decoration: none;
            padding: 16px 28px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .hero-image {
            width: 100%;
            max-width: 300px;
            box-shadow: 20px 20px 60px rgba(0,0,0,0.1);
            display: block;
        }
        
        .quote-section {
            background-color: #f4f5ff;
            padding: 80px 60px;
            text-align: center;
        }
        
        .divider {
            width: 40px;
            height: 1px;
            background-color: #9a7d45;
            margin: 0 auto 40px auto;
        }
        
        .quote {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-style: italic;
            line-height: 1.4;
            margin-bottom: 32px;
            color: #111827;
        }
        
        .main-text {
            font-size: 14px;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 24px;
        }
        
        .footer {
            margin-top: 48px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #9ca3af;
        }
        
        .brand-name {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            font-style: italic;
            color: #111827;
            margin-top: 8px;
            text-transform: none;
        }

        @media only screen and (max-width: 600px) {
            .header-section {
                padding: 40px 20px;
            }
            .hero-text-col, .hero-img-col {
                width: 100% !important;
                display: block !important;
                padding-right: 0 !important;
            }
            .hero-img-col {
                margin-top: 40px;
                text-align: center;
            }
            .title {
                font-size: 32px;
            }
            .hero-image {
                margin: 0 auto;
                max-width: 250px;
            }
            .quote-section {
                padding: 60px 30px;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <!-- Top Section -->
                    <tr>
                        <td class="header-section">
                            <table class="hero-table" role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td class="hero-text-col" valign="top">
                                        <h1 class="title">Selamat<br>bergabung di<br><span class="accent">Nomenklatur.</span></h1>
                                        <p class="description">
                                            Siap untuk transformasi digital? Di sini, Anda akan mendapatkan info produk terbaru, strategi Meta Ads yang presisi, hingga promo menarik setiap bulannya.
                                        </p>
                                        <a href="https://nomenklatur.my.id" class="button" style="color: #ffffff; text-decoration: none;"><span style="color: #ffffff;">Jelajahi Layanan</span></a>
                                    </td>
                                    <td class="hero-img-col" align="right">
                                        <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" alt="Nomenklatur Studio" class="hero-image">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Quote Section -->
                    <tr>
                        <td class="quote-section">
                            <div class="divider"></div>
                            <p class="quote">"Membangun masa depan digital melalui solusi dan strategi."</p>
                            <p class="main-text">
                                Di Nomenklatur Studio, kami percaya bahwa solusi terbaik lahir dari perpaduan desain yang estetik dan teknologi yang handal. Kami berdedikasi untuk membantu bisnis Anda tumbuh lebih cerdas di era digital.
                            </p>
                            <p class="main-text">
                                Terima kasih telah bergabung dalam perjalanan inovasi ini.
                            </p>
                            <div class="footer">
                                Tim Studio
                                <div class="brand-name">Nomenklatur</div>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
