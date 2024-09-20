const template1 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pembayaran Berhasil TNOS</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      * {
        font-family: robot, lato !important;
        font-size: large;
      }

      /* CSS styles... */
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      tr {
        border-bottom: 1px solid rgb(171, 171, 171);
      }

      td,
      th {
        padding: 10px 0; /* Adjust the values as needed */
      }

      @media print {
        /* Hide unnecessary elements when printing */
        .action-button {
          display: none;
        }
      }
    </style>
  </head>

  <body>
    <main style="text-align: center">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: start;
          border-bottom: 1px solid rgb(171, 171, 171);
        "
      >
        <img src="./assets/image/logo_loader.png" alt="" style="width: 150px" />
      </div>
      <br />
      <div style="display: block; align-items: center">
        <div style="text-align: center">
          <b style="font-weight: 600; font-size: 16px; color: #434343"
            >Pembayaran Berhasil</b
          >
        </div>
        <br />
        <br />
        <div>
          <img
            src="./assets/image/success.png"
            alt=""
            style="max-width: 220px; height: 150px"
          />
        </div>
        <div style="padding: 10px">
          <b
            style="
              text-align: center;
              font-weight: 600;
              font-size: 16px;
              color: #434343;
            "
            >Kepada Suratno</b
          >
          <p
            style="
              text-align: justify;
              font-weight: 400;
              font-size: 14px;
              color: #434343;
            "
          >
            Pembayaran anda telah berhasil, Anda juga dapat mendownload detail
            pembayaran dilampiran email ini.
          </p>
        </div>

        <div style="border: 1px solid rgb(171, 171, 171); padding: 10px">
          <div
            style="
              border-bottom: 1px solid rgb(171, 171, 171);
              padding-bottom: 20px;
              width: 100%;
            "
          >
            <b
              style="
                text-align: center;
                font-weight: 600;
                font-size: 14px;
                color: #434343;
              "
              >Detail Pembayaran</b
            >
          </div>
          <br />
          <div style="background-color: #f2f4f7; padding: 10px">
            <table style="width: 100%">
              <tr>
                <td
                  align="left"
                  style="font-weight: 400; font-size: 12px; color: #434343"
                >
                  Order ID
                </td>
                <td
                  align="right"
                  style="font-weight: 600; font-size: 13px; color: #434343"
                >
                  c0b6a242-b27a-4ca2-9816-b393bcc222dc
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  style="font-weight: 400; font-size: 12px; color: #434343"
                >
                  Id Referensi
                </td>
                <td
                  align="right"
                  style="font-weight: 600; font-size: 13px; color: #434343"
                >
                  TNOS-1787278
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  style="font-weight: 400; font-size: 12px; color: #434343"
                >
                  Pembayaran Via
                </td>
                <td
                  align="right"
                  style="font-weight: 600; font-size: 13px; color: #434343"
                >
                  Virtual Account Mandiri
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  style="font-weight: 400; font-size: 12px; color: #434343"
                >
                  Waktu Pembayaran
                </td>
                <td
                  align="right"
                  style="font-weight: 600; font-size: 13px; color: #434343"
                >
                  04/04/2023 15.31 WIB
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  style="font-weight: 400; font-size: 12px; color: #434343"
                >
                  Status Pembayaran
                </td>
                <td
                  align="right"
                  style="font-weight: 600; font-size: 13px; color: #434343"
                >
                  Berhasil
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  style="font-weight: 400; font-size: 12px; color: #434343"
                >
                  Total Pembayaran
                </td>
                <td
                  align="right"
                  style="font-weight: 600; font-size: 13px; color: #434343"
                >
                  Rp 180.000,00
                </td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <div style="text-align: center">
          <button
            class="action-button"
            style="
              padding: 8px 20px;
              text-decoration: none;
              background-color: #0b6908;
              color: white;
              border: transparent;
              line-height: 20px;
            "
            onclick="window.print()"
          >
            Cetak Pembayaran
          </button>
        </div>
      </div>
    </main>
  </body>
</html>
`;

export { template1 };
