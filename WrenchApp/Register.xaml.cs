using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WrenchApp
{
    /// <summary>
    /// Interaction logic for Register.xaml
    /// </summary>
    public partial class Register : Window
    {
        public Register()
        {
            InitializeComponent();
        }

        private void Close_Screen(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                this.DragMove();
            }
        }

        async private void Create_Account(object sender, EventArgs e)
        {
            string username = Username.Text;
            string email = Email.Text.ToLower();
            string password = Password.Password.ToString();
            string passwordconf = PasswordConf.Password.ToString();

            // Ensure that all data is given, no whitespaces and that tos is accepted
            if (username == "" || email == "" || password == "" || passwordconf == "")
            {
                MessageBox.Show("Missing information!", "Warning");
            } else if (password != passwordconf)
            {
                MessageBox.Show("The passwords do not match!", "Warning");
            } else if (
                username.Any(Char.IsWhiteSpace) ||
                email.Any(Char.IsWhiteSpace) ||
                password.Any(Char.IsWhiteSpace)
                )
            {
                MessageBox.Show("No whitespaces allowed!", "Warning");
            } else if (toscheck.IsChecked == false)
            {
                MessageBox.Show("You must accept the terms and conditons!", "Warning");
            } else
            {
                var formContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("username", username),
                    new KeyValuePair<string, string>("email", email),
                    new KeyValuePair<string, string>("password", password)
                });

                // Create a new HttpClient to handle the request
                HttpClient httpClient = new HttpClient();

                try
                {
                    // Attempt to send login request
                    HttpResponseMessage response = await httpClient.PostAsync($"http://localhost:{ConfigurationManager.AppSettings["port"].ToString()}/register", formContent);

                    try
                    {
                        // Ensure response is ok
                        response.EnsureSuccessStatusCode();

                        MessageBox.Show("Successfully created account, please verify\nyour account via the link sent to your email!", "Success");

                        // Open login window
                        Window login = new Login();
                        login.Show();
                        this.Close();
                    }
                    catch
                    {
                        MessageBox.Show("User already exists!", "Error");
                    }

                } catch
                {
                    MessageBox.Show("Error connecting to server!", "Error");
                }
            }
        }

        private void CheckPass(object sender, EventArgs e)
        {
            if (Password.Password.ToString() != PasswordConf.Password.ToString())
            {
                passwordwarning.Visibility = Visibility.Visible;
            } else
            {
                passwordwarning.Visibility = Visibility.Hidden;
            }
        }

        private void Login(object sender, EventArgs e)
        {
            Window login = new Login();
            login.Show();
            this.Close();
        }
    }
}
