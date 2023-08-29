import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

import * as styles from "./styles.module.css";
import countries from "../../utils/countries.json";

const url = `https://foundation.us5.list-manage.com/subscribe/post?u=ddc99c7db248c3df0ef4f7d24&id=404bf38b27&f_id=006280e9f0`;
const isFloatingProps = {
  onFocus: (e) => e.target.classList.add(styles.isFloating),
  onBlur: (e) => {
    if (e.target.value === "") {
      e.target.classList.remove(styles.isFloating);
    }
  },
};
const CustomForm = ({ status, message, onValidated }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (isCheckboxChecked) data["group[383329][1]"] = isCheckboxChecked;
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    data.tags = "4226967";
    console.log(data);
    onValidated(data);
  };
  if (status === "success")
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successMsg}>
          <p>{message}</p>
        </div>
        <div className={styles.calBtn}>
          <a
            download
            target="_blank"
            rel="noopener noreferrer"
            href="https://grnsft.org/decarb/calendar-2023"
            className="button"
          >
            Add to Calendar
          </a>
        </div>
        <p>Share the event</p>
        <div className={styles.social}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Join me at Decarbonize Software on Nov 16! Let's reduce software's environmental impact together. RSVP ➡️ https://decarb.greensoftware.foundation/`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0585144 0.767944L9.32465 13.1673L0 23.2485H2.0986L10.2623 14.4223L16.8584 23.2485H24L14.2125 10.1517L22.8918 0.767944H20.7932L13.2748 8.89675L7.20014 0.767944H0.0585144ZM3.14467 2.31498H6.42555L20.9134 21.7012H17.6325L3.14467 2.31498Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://decarb.greensoftware.foundation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInLogoIcon />
          </a>
        </div>
      </div>
    );
  return (
    <Form.Root className={styles.form} onSubmit={handleSubmit}>
      {status === "error" && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorMsg}>
            {message || "Something went wrong. Please try again."}
          </p>
        </div>
      )}
      <Form.Field className={styles.field} name="FNAME">
        <div className={styles.inputWrapper}>
          <Form.Control
            className={styles.input}
            {...isFloatingProps}
            required
          ></Form.Control>
          <Form.Label className={styles.label}>First Name *</Form.Label>
        </div>
        <Form.Message className={styles.error} match="valueMissing">
          Please enter your first name
        </Form.Message>
      </Form.Field>
      <Form.Field className={styles.field} name="EMAIL">
        <div className={styles.inputWrapper}>
          <Form.Control
            className={styles.input}
            {...isFloatingProps}
            required
            type="email"
          ></Form.Control>
          <Form.Label className={styles.label}>Email *</Form.Label>
        </div>
        <Form.Message className={styles.error} match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className={styles.error} match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>
      <Form.Field className={styles.field} name="COUNTRY">
        <div className={styles.inputWrapper}>
          <Form.Control className={styles.input} {...isFloatingProps} asChild>
            <select defaultValue="">
              <option value="" disabled></option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Form.Control>
          <Form.Label className={styles.label}>Country</Form.Label>
        </div>
      </Form.Field>
      <Form.Field className={styles.field} name="ROLE">
        <div className={styles.inputWrapper}>
          <Form.Control
            className={styles.input}
            {...isFloatingProps}
          ></Form.Control>
          <Form.Label className={styles.label}>Role</Form.Label>
        </div>
      </Form.Field>
      <div className={styles.checkbox}>
        <Checkbox.Root
          className={styles.checkboxRoot}
          id="c1"
          value={isCheckboxChecked}
          onCheckedChange={(isChecked) => setIsCheckboxChecked(isChecked)}
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>
            <CheckIcon width="1rem" height="1rem" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="Label" htmlFor="c1">
          Also subscribe to GSF newsletter
        </label>
      </div>

      <Form.Submit asChild>
        <button
          type="submit"
          className="button"
          data-loading={status === "sending"}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Registering..." : "Register"}
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

const RegisterForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <CustomForm
        status={status}
        message={message}
        onValidated={(formData) => subscribe(formData)}
      />
    )}
  />
);

export default RegisterForm;
